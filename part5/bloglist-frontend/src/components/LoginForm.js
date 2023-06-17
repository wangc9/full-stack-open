import { useState } from 'react';
import Notification from './Notification';
import loginService from '../services/login';
import blogService from '../services/blogs';

function LoginForm({ setUser, message, setMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

export default LoginForm;
