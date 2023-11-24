const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const { SECRET } = require('../util/config');
const { User, Session } = require('../models/index');

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body;
  const user = await User.findOne({
    where: { username: username, enabled: true },
  });
  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.passwordHash);
    if (passwordMatched) {
      const userForToken = {
        username,
        id: user.id,
      };
      const token = jwt.sign(userForToken, SECRET);
      const session = await Session.findOne({ where: { user: user.id } });
      if (!session) {
        await Session.create({ user: user.id });
      }
      return response.status(200).json({ token, username, name: user.name });
    } else {
      next(new EvalError('Invalid username or password'));
    }
  } else {
    next(new ReferenceError('Can not find user'));
  }
});

module.exports = loginRouter;
