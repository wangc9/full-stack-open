const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there are initially some blogs saved', () => {
  test('blogs returned have the correct amount', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blogs have correct id property', async () => {
    const response = await api.get('/api/blogs');
    const tests = response.body.map((entry) => entry.id);
    for (const id of tests) {
      expect(id).toBeDefined();
    }
  });
});

describe('addition of new blogs', () => {
  let token = null;
  const id = null;
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('12345', 10);
    const user = await new User({ username: 'test', passwordHash }).save();

    const userForToken = { username: 'test', id: user.id };
    token = jwt.sign(userForToken, process.env.SECRET);

    return token;
  });

  test('blogs are correctly added to database', async () => {
    const testBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
      likes: 0,
    };

    const testObject = new Blog(testBlog).toJSON();
    delete testObject.id;

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => delete blog.id);
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('blog has 0 as default for likes', async () => {
    const testBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
    };

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const lastBlog = blogs.pop();
    expect(lastBlog.likes).toEqual(0);
  });

  test('blog must has title and url', async () => {
    const testBlog1 = {
      author: 'test',
      url: 'test',
    };
    const testBlog2 = {
      title: 'test',
      author: 'test',
    };
    const testBlog3 = {
      author: 'test',
    };

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog1)
      .expect(400);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog2)
      .expect(400);

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog3)
      .expect(400);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('12345', 10);
    const user = await new User({ username: 'test', passwordHash }).save();

    const userForToken = { username: 'test', id: user.id };
    token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'ownblog',
      author: 'ownblog',
      url: 'https://localhost:4444',
    };
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    return { token };
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await Blog.find({});
    const id = blogs.slice(-1)[0]._id.toString();

    await api.delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const changedBlogs = await helper.blogsInDb();
    expect(changedBlogs).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with status code 401 if not authorised', async () => {
    const blogs = await Blog.find({});
    const id = blogs.slice(-1)[0]._id.toString();

    const passwordHash = await bcrypt.hash('54321', 10);
    const user = await new User({ username: 'test2', passwordHash }).save();

    const userForToken = { username: 'test2', id: user.id };
    token = jwt.sign(userForToken, process.env.SECRET);

    await api.delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
    const changedBlogs = await helper.blogsInDb();
    expect(changedBlogs).toHaveLength(helper.initialBlogs.length + 1);
  });
});

describe('update of a blog', () => {
  test('succeeds with status 200 and new content if id is valid', async () => {
    const defaultBlogs = await helper.blogsInDb();
    const blogToUpdate = defaultBlogs[0];

    const newBlog = {
      title: 'new title',
      author: 'new author',
      url: 'new url',
      likes: 10000,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

    const updatedBlogs = await helper.blogsInDb();
    const temp = new Blog(newBlog).toJSON();
    delete temp.id;
    updatedBlogs.forEach((blog) => delete blog.id);
    expect(updatedBlogs).toContainEqual(temp);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
