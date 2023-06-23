const lodash = require('lodash');
const countBy = require('lodash/countBy');
const sumBy = require('lodash/sumBy');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.length === 0
  ? 0 : blogs.reduce((sum, post) => sum + post.likes, 0));

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let max = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > max.likes) {
      max = blogs[i];
    }
  }
  const result = {
    title: max.title,
    author: max.author,
    likes: max.likes,
  };

  return result;
};

const mostBlogs = (blogs) => {
  const authorCount = countBy(blogs, 'author');
  const result = Object.keys(authorCount)
    .reduce((a, b) => (authorCount[a] > authorCount[b] ? a : b));

  return {
    author: result,
    blogs: authorCount[result],
  };
};

const mostLikes = (blogs) => {
  const likeCount = lodash(blogs).groupBy('author').map((obj, key) => ({
    author: key,
    likes: sumBy(obj, 'likes'),
  })).value();

  return likeCount.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
