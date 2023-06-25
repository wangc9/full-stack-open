// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

function Notification() {
  const message = useSelector((state) => state.notification);
  if (message === '') return null;

  return message.includes('ERROR') ? (
    <Alert severity="error">{message}</Alert>
  ) : (
    <Alert severity="success">{message}</Alert>
  );
}

export default Notification;
