const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

const { User, Blog } = require('../models/index');

const userFinder = async (request, _response, next) => {
  request.user = await User.findOne({
    where: { username: request.params.username },
  });
  next();
};

userRouter.get('/', async (_request, response) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  response.json(users);
});

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = User.build({ name, username, passwordHash });
    await newUser.save();

    return response.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:username', userFinder, async (request, response, next) => {
  if (request.user) {
    try {
      const user = request.user;
      user.username = request.body.username;
      await user.save();

      return response.status(201).json(user);
    } catch (error) {
      next(error);
    }
  } else {
    next(new ReferenceError('No user found'));
  }
});

module.exports = userRouter;
