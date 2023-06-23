import { useState } from 'react';

function Blog({ user, blog, deleteBlog, likeBlog }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('view');
  const showWhenVisible = { display: show ? '' : 'none' };

  const handleClick = () => {
    setShow(!show);
    setName(name === 'view' ? 'hide' : 'view');
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id);
    }
  };

  const handleLike = async () => {
    const newBlog = {
      likes: blog.likes + 1,
    };
    await likeBlog(blog.id, newBlog);
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
      )}
    </div>
  );
}

export default Blog;
