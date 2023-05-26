// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0 : blogs.reduce((sum, post) => sum + post.likes, 0));

module.exports = { dummy, totalLikes };
