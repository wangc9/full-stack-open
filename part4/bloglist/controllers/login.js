// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

// eslint-disable-next-line consistent-return
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCheck = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCheck)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }
  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 },
  );

  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
