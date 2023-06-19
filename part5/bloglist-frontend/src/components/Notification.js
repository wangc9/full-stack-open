function Notification({ message }) {
  if (message === '') return null;

  if (message.includes('Wrong')) {
    return <div id="error-message" className="error">{message}</div>;
  }

  return <div id="success-message" className="success">{message}</div>;
}

export default Notification;
