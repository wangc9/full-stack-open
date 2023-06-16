function Notification({ message }) {
  if (message === '') return null;

  if (message.includes('Wrong')) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
}

export default Notification;
