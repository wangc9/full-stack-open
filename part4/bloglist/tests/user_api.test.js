/* eslint no-param-reassign: 0 */
/* eslint no-undef: 0 */
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a new legitimate user', async () => {
    const initialUser = await helper.usersInDb();

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
    expect(currentUsers).toHaveLength(initialUser.length + 1);

    const temp = new User(newUser).toJSON();
    delete temp.id;
    currentUsers.forEach((user) => delete user.id);
    expect(currentUsers).toContainEqual(temp);
  });

  test('error occur when no username is given', async () => {
    const initialUser = await helper.usersInDb();

    const newUser = {
      name: 'Charles',
      password: 'InLine',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(initialUser.length);
  });

  test(
    'error occur when username is less than 3 characters long or not unique',
    async () => {
      const initialUser = await helper.usersInDb();

      const newUser1 = {
        username: 'ro',
        name: 'Charles',
        password: 'InLine',
      };
      const newUser2 = {
        username: 'root',
        name: 'Charles',
        password: 'InLine',
      };

      await api.post('/api/users').send(newUser1).expect(400);

      await api.post('/api/users').send(newUser2).expect(400);

      const currentUsers = await helper.usersInDb();
      expect(currentUsers).toHaveLength(initialUser.length);
    },
  );

  test('error occur when no password is given', async () => {
    const initialUser = await helper.usersInDb();

    const newUser = {
      username: 'wangc',
      name: 'Charles',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(initialUser.length);
  });

  test('error occur when password is less than 3 characters long', async () => {
    const initialUser = await helper.usersInDb();

    const newUser = {
      username: 'wangc',
      name: 'Charles',
      password: 'AB',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const currentUsers = await helper.usersInDb();
    expect(currentUsers).toHaveLength(initialUser.length);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
