const blogRouter = require('express').Router();

const { Blog, User, Session } = require('../models/index');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Op } = require('sequelize');

const blogFinder = async (request, _response, next) => {
  request.blog = await Blog.findByPk(request.params.id);
  next();
};

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

blogRouter.delete(
  '/:id',
  getToken,
  blogFinder,
  async (request, response, next) => {
    if (request.blog) {
      if (request.blog.userId === request.decodedToken.id) {
        try {
          const blog = request.blog;
          await blog.destroy();
          return response.status(204).end();
        } catch (error) {
          next(error);
        }
      } else {
        next(new EvalError('The blog does not belong to the user'));
      }
    } else {
      next(new ReferenceError('No blog found'));
    }
  }
);

blogRouter.put(
  '/:id',
  getToken,
  blogFinder,
  async (request, response, next) => {
    if (request.blog) {
      if (request.blog.userId === request.decodedToken.id) {
        try {
          const blog = request.blog;
          blog.likes = request.body.likes;
          await blog.save();
          return response.status(201).json(blog);
        } catch (error) {
          next(error);
        }
      } else {
        next(new EvalError('The blog does not belong to the user'));
      }
    } else {
      next(new ReferenceError('No blog found'));
    }
  }
);

module.exports = blogRouter;
