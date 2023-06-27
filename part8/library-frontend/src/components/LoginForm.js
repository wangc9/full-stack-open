import {useMutation} from '@apollo/client';
import {useField} from '../hooks';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import Notification from './Notification';
import {LOGIN} from './queries';

const LoginForm = ({setToken, setUser}) => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [login, {data, loading, error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
      setUser(username.value);
      setErrorMsg(`SUCCESS: Hi ${username.value}! Welcome back!`)
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      navigate('/');
    },
    onError: (error) => {
      setErrorMsg(`ERROR: ${error.graphQLErrors[0].message}`);
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    }
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await login({
        variables: {
          username: username.value,
          password: password.value,
        }
      });
    } catch (error) {
      setErrorMsg(`ERROR: ${error.graphQLErrors[0].message}`);
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    }
  }

  return (
    <div>
      {errorMsg !== '' && (<Notification message={errorMsg} />)}
      <br />
      <form onSubmit={submit}>
        <div>
          <TextField
            label={username.name}
            id={username.id}
            name={username.name}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <br />
        <div>
          <TextField
            label={password.name}
            id={password.id}
            name={password.name}
            value={password.value}
            type={password.type}
            onChange={password.onChange}
          />
        </div>
        <br />
        <div>
          <Button
            type="submit"
            id="login-button"
            variant="contained"
            color="primary"
          >
            <b>login</b>
          </Button>
        </div>
      </form>
    </div>
  )
};

export default LoginForm;
