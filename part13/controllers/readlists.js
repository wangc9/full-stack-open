const readlistRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Readlist, Session } = require('../models/index');

const getToken = async (request, _response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      request.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      const session = await Session.findOne({
        where: { user: request.decodedToken.id },
      });
      if (!session) {
        next(new EvalError('Login has expired'));
      }
    } catch (error) {
      next(new EvalError('Token invalid'));
    }
  } else {
    next(new EvalError('Token missing'));
  }
  next();
};

readlistRouter.post('/', async (request, response, next) => {
  try {
    const record = Readlist.build(request.body);
    await record.save();
    return response.json(record);
  } catch (error) {
    next(error);
  }
});

readlistRouter.put('/:id', getToken, async (request, response, next) => {
  try {
    const record = await Readlist.findOne({
      where: { userId: request.decodedToken.id, blogId: request.params.id },
    });
    if (record) {
      record.state = request.body.read ? 'read' : 'unread';
      await record.save();
      return response.json(record);
    } else {
      next(new EvalError("No blog found in the current user's reading list"));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = readlistRouter;
