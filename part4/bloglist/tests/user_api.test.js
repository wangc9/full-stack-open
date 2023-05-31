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

  test('creation succeeds with a new user', async () => {
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

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
