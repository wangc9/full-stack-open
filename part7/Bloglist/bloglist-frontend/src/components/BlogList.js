import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import Comment from './Comment';

export function Blog({ user, blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate('/blogs');
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div id="likes">
        likes {blog.likes}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      added by {blog.user.name}
      <br />
      {user.username === blog.user.username && (
        <button id="delete-button" onClick={handleDelete}>
          delete
        </button>
      )}
      <Comment blog={blog} />
    </div>
  );
}

function Blogs({ user, blog }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('view');
  const showWhenVisible = { display: show ? '' : 'none' };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  return (
    <div className="blog">
      <div className="init">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
}

function BlogList({ user }) {
  const blogs = useSelector((state) => state.blog);
  const sortBlogs = [...blogs];

  function compareLikes(blog1, blog2) {
    return blog2.likes - blog1.likes;
  }

  return (
    <div id="blogs">
      {sortBlogs.sort(compareLikes).map((blog) => (
        <Blogs key={blog.id} user={user} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
