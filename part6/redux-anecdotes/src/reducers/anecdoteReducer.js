import {createSlice} from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const ancedoteSlice = createSlice({
  name: 'ancedotes',
  initialState: [],
  reducers: {
    changeVote(state, action) {
      const id = action.payload.id;

      return state.map(anecdote => anecdote.id === id ? action.payload : anecdote);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const {changeVote, appendAnecdote, setAnecdotes} = ancedoteSlice.actions;

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = id => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(id);
    dispatch(changeVote(newAnecdote));
  };
};

export default ancedoteSlice.reducer;