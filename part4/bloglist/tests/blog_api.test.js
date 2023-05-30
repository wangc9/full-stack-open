const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

// eslint-disable-next-line no-undef
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// eslint-disable-next-line no-undef
describe('when there are initially some blogs saved', () => {
  // eslint-disable-next-line no-undef
  test('blogs returned have the correct amount', async () => {
    const response = await api.get('/api/blogs');
    // eslint-disable-next-line no-undef
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  // eslint-disable-next-line no-undef
  test('blogs have correct id property', async () => {
    const response = await api.get('/api/blogs');
    const tests = response.body.map((entry) => entry.id);
    // eslint-disable-next-line no-restricted-syntax
    for (const id of tests) {
      // eslint-disable-next-line no-undef
      expect(id).toBeDefined();
    }
  });
});

// eslint-disable-next-line no-undef
describe('addition of new blogs', () => {
  // eslint-disable-next-line no-undef
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
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    // eslint-disable-next-line no-param-reassign
    blogs.forEach((blog) => delete blog.id);
    // eslint-disable-next-line no-undef
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    // eslint-disable-next-line no-undef
    expect(blogs).toContainEqual(testObject);
  });

  // eslint-disable-next-line no-undef
  test('blog has 0 as default for likes', async () => {
    const testBlog = {
      title: 'test',
      author: 'test',
      url: 'test',
    };

    await api.post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const lastBlog = blogs.pop();
    // eslint-disable-next-line no-undef
    expect(lastBlog.likes).toEqual(0);
  });

  // eslint-disable-next-line no-undef
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

    await api.post('/api/blogs').send(testBlog1).expect(400);

    await api.post('/api/blogs').send(testBlog2).expect(400);

    await api.post('/api/blogs').send(testBlog3).expect(400);

    const blogs = await helper.blogsInDb();
    // eslint-disable-next-line no-undef
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

// eslint-disable-next-line no-undef
describe('deletion of a blog', () => {
  // eslint-disable-next-line no-undef
  test('succeeds with status code 204 if id is valid', async () => {
    const defaultBlogs = await helper.blogsInDb();
    const blogToDelete = defaultBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const changedBlogs = await helper.blogsInDb();
    // eslint-disable-next-line no-undef
    expect(changedBlogs).toHaveLength(helper.initialBlogs.length - 1);
    // eslint-disable-next-line no-undef
    expect(changedBlogs).not.toContainEqual(blogToDelete);
  });
});

// eslint-disable-next-line no-undef
describe('update of a blog', () => {
  // eslint-disable-next-line no-undef
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
    // eslint-disable-next-line no-param-reassign
    updatedBlogs.forEach((blog) => delete blog.id);
    // eslint-disable-next-line no-undef
    expect(updatedBlogs).toContainEqual(temp);
  });
});

// eslint-disable-next-line no-undef
afterAll(async () => {
  await mongoose.connection.close();
});
