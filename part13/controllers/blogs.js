const blogRouter = require('express').Router();

const { Blog, User } = require('../models/index');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Op } = require('sequelize');

const blogFinder = async (request, _response, next) => {
  request.blog = await Blog.findByPk(request.params.id);
  next();
};

const getToken = (request, _response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      request.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      next(new EvalError('Token invalid'));
    }
  } else {
    next(new EvalError('Token missing'));
  }
  next();
};

blogRouter.get('/', async (request, response) => {
  let where = {};
  if (request.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: request.query.search,
          },
        },
        {
          author: {
            [Op.substring]: request.query.search,
          },
        },
      ],
    };
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  });
  response.json(blogs);
});

blogRouter.post('/', getToken, async (request, response, next) => {
  const body = request.body;
  try {
    const user = await User.findByPk(request.decodedToken.id);
    const newBlog = Blog.build({ ...body, userId: user.id });
    await newBlog.save();

    return response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', blogFinder, async (request, response, next) => {
  if (request.blog) {
    try {
      const blog = request.blog;
      await blog.destroy();
      return response.status(204).end();
    } catch (error) {
      next(error);
    }
  } else {
    next(new ReferenceError('No blog found'));
  }
});

blogRouter.put('/:id', blogFinder, async (request, response, next) => {
  if (request.blog) {
    try {
      const blog = request.blog;
      blog.likes = request.body.likes;
      await blog.save();
      return response.status(201).json(blog);
    } catch (error) {
      next(error);
    }
  } else {
    next(new ReferenceError('No blog found'));
  }
});

module.exports = blogRouter;
