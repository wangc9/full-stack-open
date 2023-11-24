const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json(error);
  }
  if (error.name === 'ReferenceError') {
    return response.status(404).json({ error: error.message });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json(error);
  }
  if (error.name === 'EvalError') {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

module.exports = errorHandler;
