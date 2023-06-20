import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    voteNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return '';
    },
  },
});

export const {voteNotification, clearNotification} = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(voteNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;