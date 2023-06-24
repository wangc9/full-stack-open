import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setErrorNotification,
  setSuccessNotification,
} from './reducers/notificationReducer';
import { initialiseBlogs } from './reducers/blogReducer';
import './index.css';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';

function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  }, []);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

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

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    dispatch(setSuccessNotification('User logged out successfully', 2));
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
              <BlogForm user={user} />
            </Togglable>
          </div>

          <br />
          <BlogList user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
