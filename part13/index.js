const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connection } = require('./util/db');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/author');
const readlistRouter = require('./controllers/readlists');
const logoutRouter = require('./controllers/logout');

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readlistRouter);
app.use('/api/logout', logoutRouter);

const errorHandler = require('./middlewares/errorHandling');
app.use(errorHandler);

const start = async () => {
  await connection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
