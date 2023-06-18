import { useState } from 'react';
import axios from 'axios';

function Blog({ blog, mainShow, setMainShow }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('view');
  const showWhenVisible = { display: show ? '' : 'none' };

  const handleClick = () => {
    setShow(!show);
    setName(name === 'view' ? 'hide' : 'view');
  };

  const handleLike = async () => {
    const newBlog = {
      likes: blog.likes + 1,
    };
    const response = await axios.put(`/api/blogs/${blog.id}`, newBlog);
    setMainShow(!mainShow);

    return response.data;
  };

  return (
    <div className="blog">
      <div>
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button onClick={handleClick}>{name}</button>
        <div style={showWhenVisible}>
          <div>
            {blog.url}
          </div>
          <div>
            likes
            {' '}
            {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
