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
