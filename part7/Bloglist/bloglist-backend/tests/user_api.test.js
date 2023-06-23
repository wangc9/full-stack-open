const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');
const Blog = require('../models/blog');

const api = supertest(app);

describe('when there is initially one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const userObjects = helper.initialUsers.map((user) => new User(user));
    const promiseArray = userObjects.map((user) => user.save());
    await Promise.all(promiseArray);
  });

  test('creation succeeds with a new legitimate user', async () => {
    const newUser = {
      username: 'wangc',
      name: 'Charles',
      password: 'InLine',
    };

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(helper.initialUsers.length + 1);

    const temp = new User(newUser).toJSON();
    delete temp.id;
    currentUsers.forEach((user) => delete user.id);
    expect(currentUsers).toContainEqual(temp);
  });

  test('error occur when no username is given', async () => {
    const newUser = {
      name: 'Charles',
      password: 'InLine',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(helper.initialUsers.length);
  });

  test(
    'error occur when username is less than 3 characters long or not unique',
    async () => {
      const newUser1 = {
        username: 'ro',
        name: 'Charles',
        password: 'InLine',
      };
      const newUser2 = {
        username: 'hellas',
        name: 'Charles',
        password: 'InLine',
      };

      await api.post('/api/users').send(newUser1).expect(400);

      await api.post('/api/users').send(newUser2).expect(400);

      const currentUsers = await helper.usersInDb();
      expect(currentUsers).toHaveLength(helper.initialUsers.length);
    },
  );

  test('error occur when no password is given', async () => {
    const newUser = {
      username: 'wangc',
      name: 'Charles',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(helper.initialUsers.length);
  });

  test('error occur when password is less than 3 characters long', async () => {
    const newUser = {
      username: 'wangc',
      name: 'Charles',
      password: 'AB',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(helper.initialUsers.length);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
