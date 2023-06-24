import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import {
  setErrorNotification,
  setSuccessNotification,
} from './notificationReducer';

const initialState = [];

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    addLike(state, action) {
      const id = action.payload.id;

      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    handleDelete(state, action) {
      const { id } = action.payload;

      return state.filter((blog) => blog.id !== id);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const { setBlogs, appendBlog, addLike, handleDelete, updateBlog } =
  blogSlice.actions;

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(initialiseBlogs());
      dispatch(
        setSuccessNotification(
          `Added new blog ${content.title} by ${content.author}`,
          3
        )
      );
    } catch (error) {
      dispatch(
        setErrorNotification(
          `Can not create new blog ${content.title} by ${content.author}`,
          3
        )
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.update(blog);
      dispatch(addLike(newBlog));
      dispatch(
        setSuccessNotification(
          `You liked ${newBlog.title} by ${newBlog.author}`,
          3
        )
      );
    } catch (error) {
      dispatch(
        setErrorNotification(`Can not like ${blog.title} by ${blog.author}`)
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.remove(blog.id);
      const content = {
        id: blog.id,
      };
      dispatch(handleDelete(content));
      dispatch(
        setSuccessNotification(
          `You have deleted blog ${blog.title} by ${blog.author}`,
          3
        )
      );
    } catch (error) {
      dispatch(
        setErrorNotification(
          `Can not delete blog ${blog.title} by ${blog.author}`,
          3
        )
      );
    }
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.comment(blog, comment);
      dispatch(updateBlog(commentedBlog));
      dispatch(
        setSuccessNotification('You have made a comment on this blog', 3)
      );
    } catch (error) {
      dispatch(setErrorNotification('Can not make a comment', 3));
    }
  };
};

export default blogSlice.reducer;
