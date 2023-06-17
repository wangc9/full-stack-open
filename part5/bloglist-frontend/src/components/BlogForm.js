import { useState } from 'react';
import Notification from './Notification';
import Blog from './Blog';
import Togglable from './Togglable';
import blogService from '../services/blogs';

function BlogForm({
  user,
  setUser,
  show,
  setShow,
  blogs,
  message,
  setMessage,
}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setMessage('User logged out successfully');
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const blog = { title: title, author: author, url: url };
    const response = await blogService.create(blog);
    setMessage(`A new blog ${title} by ${author} added`);
    setTimeout(() => {
      setMessage('');
    }, 2000);
    setAuthor('');
    setTitle('');
    setUrl('');
    setShow(!show);
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name}
        {' '}
        logged-in
        <button onClick={handleLogout} type="submit">logout</button>
      </div>
      <br />
      <h2>Create New</h2>
      <Togglable buttonLabel="create">
        <div>
          title:
          {' '}
          <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          {' '}
          <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          {' '}
          <input type="URL" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleCreate}>create</button>
        </div>
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogForm;