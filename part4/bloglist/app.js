const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const app = express();
const cors = require('cors');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('connected to database');
}).catch((error) => {
  logger.error('error connecting to MongoDB:', error.message);
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
