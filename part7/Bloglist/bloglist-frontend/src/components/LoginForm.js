import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import BlogForm from './BlogForm';
import { loginUser } from '../reducers/userReducer';

function LoginForm() {
  const username = useField('text', 'username');
  const password = useField('text', 'password');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username: username.value, password: password.value }));
    username.clearValue();
    password.clearValue();
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            id={username.id}
            type={username.type}
            name={username.name}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          password{' '}
          <input
            id={password.id}
            type={password.type}
            name={password.name}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
}

BlogForm.prototype = {
  userLogin: PropTypes.func.isRequired,
};

export default LoginForm;
