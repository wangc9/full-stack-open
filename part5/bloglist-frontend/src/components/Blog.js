import { useState } from 'react';

function Blog({ blog }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('view');
  const showWhenVisible = { display: show ? '' : 'none' };

  const handleClick = () => {
    setShow(!show);
    setName(name === 'view' ? 'hide' : 'view');
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
            <button>like</button>
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
