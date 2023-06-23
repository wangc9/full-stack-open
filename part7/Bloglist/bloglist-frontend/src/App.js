import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setErrorNotification,
  setSuccessNotification,
} from './reducers/notificationReducer';
import './index.css';
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

  const dispatch = useDispatch();

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
      window.localStorage.setItem(
        'loggedBlogUser',
        JSON.stringify(currentUser)
      );
      blogService.setToken(currentUser.token);
      setUser(currentUser);
      dispatch(setSuccessNotification('User logged in successfully', 2));
    } catch (exception) {
      dispatch(setErrorNotification('Wrong username or password!', 2));
    }
  };

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const response = await blogService.create(blog);
    dispatch(
      setSuccessNotification(
        `A new blog ${blog.title} by ${blog.author} added`,
        2
      )
    );
    setShow(!show);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    dispatch(setSuccessNotification('User logged out successfully', 2));
  };

  function compareLikes(blog1, blog2) {
    return blog2.likes - blog1.likes;
  }

  const deleteBlog = async (id) => {
    try {
      const response = await blogService.remove(id);
      setShow(!show);
    } catch (exception) {
      dispatch(setErrorNotification(`${exception.response.data.error}`, 2));
    }
  };

  const likeBlog = async (blogId, newBlog) => {
    try {
      const response = await axios.put(`/api/blogs/${blogId}`, newBlog);
      dispatch(
        setSuccessNotification(
          `You liked blog ${response.data.title} by ${response.data.author}`,
          2
        )
      );
      setShow(!show);
    } catch (exception) {
      dispatch(setErrorNotification(`${exception.response.data.error}`, 2));
    }
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm userLogin={userLogin} />
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged-in
            <button id="logout-button" onClick={handleLogout} type="submit">
              logout
            </button>
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
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                deleteBlog={deleteBlog}
                likeBlog={likeBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
