const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  next();
};

// eslint-disable-next-line no-unused-vars
const unknownEndpoint = (request, response) => {
  request.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
  const authorisation = request.get('authorization');
  if (authorisation && authorisation.startsWith('Bearer ')) {
    request.token = authorisation.replace('Bearer ', '');
  }

  next();
};

// eslint-disable-next-line consistent-return
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
  requestLogger, unknownEndpoint, tokenExtractor, errorHandler,
};
