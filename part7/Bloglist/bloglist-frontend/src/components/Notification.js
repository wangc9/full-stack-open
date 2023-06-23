// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';

function Notification() {
  const message = useSelector((state) => state.notification);
  if (message === '') return null;

  return message.includes('ERROR') ? (
    <div id="error-message" className="error">
      {message}
    </div>
  ) : (
    <div id="success-message" className="success">
      {message}
    </div>
  );
}

export default Notification;
