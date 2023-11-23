const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connection } = require('./util/db');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

const errorHandler = require('./middlewares/errorHandling');
app.use(errorHandler);

const start = async () => {
  await connection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
