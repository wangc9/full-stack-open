import { useEffect, useRef, useState } from 'react';
import './index.css';
import axios from 'axios';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [show]);

  const blogFormRef = useRef();

  const userLogin = async (username, password) => {
    try {
      const currentUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(currentUser));
      blogService.setToken(currentUser.token);
      setUser(currentUser);
      setMessage('User logged in successfully');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (exception) {
      setMessage(`${exception}: Wrong username or password!`);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const response = await blogService.create(blog);
    setMessage(`A new blog ${blog.title} by ${blog.author} added`);
    setTimeout(() => {
      setMessage('');
    }, 2000);
    setShow(!show);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setMessage('User logged out successfully');
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  function compareLikes(blog1, blog2) {
    return blog2.likes - blog1.likes;
  }

  const deleteBlog = async (id) => {
    try {
      const response = await blogService.remove(id);
      setShow(!show);
    } catch (exception) {
      setMessage(`error ${exception.response.data.error}`);
    }
  };

  const likeBlog = async (blogId, newBlog) => {
    try {
      const response = await axios.put(`/api/blogs/${blogId}`, newBlog);
      setShow(!show);
    } catch (exception) {
      setMessage(`error ${exception.response.data.error}`);
    }
  };

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <LoginForm userLogin={userLogin} />
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name}
            {' '}
            logged-in
            <button onClick={handleLogout} type="submit">logout</button>
          </div>
          <br />
          <div>
            <h2>Create New</h2>
            <Togglable buttonLabel="create" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          </div>

          <br />
          <div id="blogs">
            {blogs.sort(compareLikes).map((blog) => (
              <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
