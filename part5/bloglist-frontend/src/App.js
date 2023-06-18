import { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

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

  const deleteBLog = async (id) => {
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

  if (user === null) {
    return (
      <LoginForm
        setUser={setUser}
        message={message}
        setMessage={setMessage}
      />
    );
  }

  return (
    <BlogForm
      user={user}
      setUser={setUser}
      show={show}
      setShow={setShow}
      message={message}
      setMessage={setMessage}
      blogs={blogs}
      deleteBlog={deleteBLog}
      likeBlog={likeBlog}
    />
  );
}

export default App;
