import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

function Blog({ user, blog, handleLike, handleDelete, showWhenVisible }) {
  return (
    <div style={showWhenVisible} className="detail">
      <div>{blog.url}</div>
      <div id="likes">
        likes {blog.likes}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {user.username === blog.user.username && (
        <div>
          <button id="remove-button" onClick={handleDelete}>
            remove
          </button>
        </div>
      )}
    </div>
  );
}

function Blogs({ user, blog }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('view');
  const showWhenVisible = { display: show ? '' : 'none' };

  const handleClick = () => {
    setShow(!show);
    setName(name === 'view' ? 'hide' : 'view');
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };

  return (
    <div className="blog">
      <div className="init">
        {blog.title} {blog.author}{' '}
        <button id="view-button" onClick={handleClick}>
          {name}
        </button>
      </div>
      {show && (
        <Blog
          user={user}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          showWhenVisible={showWhenVisible}
        />
      )}
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
