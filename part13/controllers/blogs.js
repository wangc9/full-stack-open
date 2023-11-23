const blogRouter = require('express').Router();

const { Blog } = require('../models/index');

const blogFinder = async (request, response, next) => {
  request.blog = await Blog.findByPk(request.params.id);
  next();
};

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.findAll();
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  const body = request.body;
  try {
    const newBlog = Blog.build(body);
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
