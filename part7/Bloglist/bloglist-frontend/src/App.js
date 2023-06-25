import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { logoutUser } from './reducers/userReducer';
import { initialiseBlogs } from './reducers/blogReducer';
import { registerUsers } from './reducers/usersReducer';
import './index.css';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogList, { Blog } from './components/BlogList';
import UserList from './components/UserList';
import User from './components/User';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
  }, []);

  useEffect(() => {
    dispatch(initialiseBlogs());
    dispatch(registerUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const match = useMatch('/users/:id');
  const userMatch = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const blogs = useSelector((state) => state.blog);
  const matchBlog = useMatch('/blogs/:id');
  const blogMatch = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const blogFormRef = useRef();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Container>
      <div>
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/users">
                  <b>users</b>
                </Button>
                <Button color="inherit" component={Link} to="/blogs">
                  <b>home</b>
                </Button>
              </Toolbar>
            </AppBar>
            {false && (
              <div>
                <Link to="/users" style={{ padding: 5 }}>
                  users
                </Link>
                <Link to="/blogs" style={{ padding: 5 }}>
                  home
                </Link>
              </div>
            )}
            <div>
              <h2>blogs</h2>
              <div>
                {user.name} logged-in
                <br />
                <Button
                  id="logout-button"
                  onClick={handleLogout}
                  type="button"
                  variant="contained"
                  colot="primary"
                >
                  <b>logout</b>
                </Button>
              </div>
              <br />
              <Routes>
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<User user={userMatch} />} />
                <Route
                  path="/blogs"
                  element={
                    <div>
                      <div>
                        <h2>Create New</h2>
                        <Togglable buttonLabel="create" ref={blogFormRef}>
                          <BlogForm user={user} />
                        </Togglable>
                      </div>
                      <br />
                      <BlogList user={user} />
                    </div>
                  }
                />
                <Route
                  path="/blogs/:id"
                  element={<Blog user={user} blog={blogMatch} />}
                />
              </Routes>
            </div>
            <footer>
              <i>Blog app, Chen Wang 2023</i>
            </footer>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
