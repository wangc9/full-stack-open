// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createSuccessNotification(state, action) {
      return `SUCCESS: ${action.payload}`;
    },
    createErrorNotification(state, action) {
      return `ERROR: ${action.payload}`;
    },
    clearNotification(state, action) {
      return '';
    },
  },
});

export const {
  createSuccessNotification,
  createErrorNotification,
  clearNotification,
} = notificationSlice.actions;

export const setSuccessNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(createSuccessNotification(content));
    setTimeout(() => {
      dispatch(clearNotification(''));
    }, time * 1000);
  };
};

export const setErrorNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(createErrorNotification(content));
    setTimeout(() => {
      dispatch(clearNotification(''));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
