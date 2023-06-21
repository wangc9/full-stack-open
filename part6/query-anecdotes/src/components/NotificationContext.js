import {createContext, useContext, useReducer} from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE': {
      return `You have created a new anecdote: '${action.payload}'`;
    }

    case 'VOTE': {
      return `Anecdote '${action.payload}' voted`;
    }

    default: {
      return '';
    }
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationWithDispatch = useContext(NotificationContext);

  return notificationWithDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationWithDispatch = useContext(NotificationContext);

  return notificationWithDispatch[1];
};

export default NotificationContext;