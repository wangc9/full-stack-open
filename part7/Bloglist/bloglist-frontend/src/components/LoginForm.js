import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';
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
          <TextField
            label={username.name}
            id={username.id}
            name={username.name}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          <TextField
            label={password.name}
            id={password.id}
            name={password.name}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <Button
          id="login-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          <b>login</b>
        </Button>
      </form>
    </div>
  );
}

BlogForm.prototype = {
  userLogin: PropTypes.func.isRequired,
};

export default LoginForm;
