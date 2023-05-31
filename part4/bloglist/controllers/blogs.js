/* eslint no-unused-expressions: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint prefer-destructuring: 0 */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.find({});
  console.log('users', user);
  const body = request.body;
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user[0]._id,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  user[0].blogs = user[0].blogs.concat(savedBlog._id);
  await user[0].save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' },
  );
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
