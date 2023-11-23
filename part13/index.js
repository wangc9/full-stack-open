const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connection } = require('./util/db');
const blogRouter = require('./controllers/blogs');

app.use(express.json());
app.use('/api/blogs', blogRouter);

const errorHandler = require('./middlewares/errorHandling');
app.use(errorHandler);

const start = async () => {
  await connection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
