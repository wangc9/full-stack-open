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
test('notes returned hace the correct amount', async () => {
  const response = await api.get('/api/blogs');
  // eslint-disable-next-line no-undef
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
