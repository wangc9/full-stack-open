import { useEffect, useState } from 'react';
import './index.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage('User logged in successfully');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (exception) {
      setMessage('Wrong username or password!', exception);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [show]);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            {' '}
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            {' '}
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

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
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;