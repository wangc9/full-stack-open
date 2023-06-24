import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';
import { setErrorNotification } from './notificationReducer';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const registerUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(setErrorNotification('Can not find users', 3));
    }
  };
};

export default usersSlice.reducer;
