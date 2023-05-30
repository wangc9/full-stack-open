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
