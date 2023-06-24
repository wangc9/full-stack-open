import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer';
import blogReducer from './blogReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
});

export default store;
