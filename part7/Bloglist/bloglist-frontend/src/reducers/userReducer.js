import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import {
  setErrorNotification,
  setSuccessNotification,
} from './notificationReducer';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    deleteUser(state, action) {
      return null;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setSuccessNotification(`Hi ${user.name}! Welcome back!`, 3));
    } catch (error) {
      dispatch(setErrorNotification('Wrong username or password!', 3));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      dispatch(deleteUser(''));
      window.localStorage.clear();
      dispatch(setSuccessNotification('You have logged out', 3));
    } catch (error) {
      dispatch(setErrorNotification('Can not log out', 3));
    }
  };
};

export default userSlice.reducer;
