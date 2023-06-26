import {Alert} from '@mui/material';

function Notification({ message }) {
  if (message === '') return null;

  return message.includes('ERROR') ? (
    <Alert severity="error">{message}</Alert>
  ) : (
    <Alert severity="success">{message}</Alert>
  );
}

export default Notification;
