import { useEffect, useState } from 'react';
import './index.css';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [show]);

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        message={message}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    );
  }

  return (
    <BlogForm
      user={user}
      title={title}
      author={author}
      url={url}
      message={message}
      handleLogout={handleLogout}
      handleTitleChange={({ target }) => setTitle(target.value)}
      handleAuthorChange={({ target }) => setAuthor(target.value)}
      handleUrlChange={({ target }) => setUrl(target.value)}
      handleCreate={handleCreate}
      blogs={blogs}
    />
  );
}

export default App;
