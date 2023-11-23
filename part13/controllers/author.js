const authorRouter = require('express').Router();
const { Blog } = require('../models/index');
const { fn, col } = require('sequelize');

authorRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('title')), 'articles'],
      [fn('SUM', col('likes')), 'likes'],
    ],
    group: 'author',
    order: [['likes', 'DESC']],
  });
  response.status(200).json(blogs);
});

module.exports = authorRouter;
