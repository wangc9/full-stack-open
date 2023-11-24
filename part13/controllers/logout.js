const logoutRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Session } = require('../models/index');

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
      request.session = session;
    } catch (error) {
      next(new EvalError('Token invalid'));
    }
  } else {
    next(new EvalError('Token missing'));
  }
  next();
};

logoutRouter.delete('/', getToken, async (request, response, next) => {
  try {
    request.session.destroy();
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = logoutRouter;
