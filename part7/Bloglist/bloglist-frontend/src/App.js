import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './reducers/userReducer';
import { initialiseBlogs } from './reducers/blogReducer';
import './index.css';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  }, []);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  const blogFormRef = useRef();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
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
