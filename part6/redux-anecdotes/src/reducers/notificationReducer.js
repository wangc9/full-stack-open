import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    voteNotification(state, action) {
      return `You voted '${action.payload}'`;
    },
    clearNotification(state, action) {
      return '';
    },
  },
});

export const {voteNotification, clearNotification} = notificationSlice.actions;
export default notificationSlice.reducer;