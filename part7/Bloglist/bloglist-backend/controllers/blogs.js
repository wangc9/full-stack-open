const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = request.user;
  const body = request.body;
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comments } = request.body;
  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments.concat(comments);
  const updatedBlog = await blog.save();
  // eslint-disable-next-line no-unused-expressions
  updatedBlog ? response.status(200).json(updatedBlog.toJSON()) : response.status(404).end();
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = request.user;
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    const newBlogs = [...user.blogs];
    const temp = newBlogs.filter((id) => id.toString() !== request.params.id);
    user.blogs = temp;
    await user.save();
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'Only author can delete blogs' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' },
  );
  // eslint-disable-next-line no-unused-expressions
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
