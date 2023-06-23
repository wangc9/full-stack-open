const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  next();
};

const unknownEndpoint = (request, response) => {
  request.status(404).send({ error: 'unknown endpoint' });
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }

  next();
};

const tokenExtractor = (request, response, next) => {
  const authorisation = request.get('authorization');
  if (authorisation && authorisation.startsWith('Bearer ')) {
    request.token = authorisation.replace('Bearer ', '');
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
};

module.exports = {
  requestLogger, unknownEndpoint, tokenExtractor, errorHandler, userExtractor,
};
