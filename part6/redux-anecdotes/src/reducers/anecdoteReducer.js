import {createSlice} from '@reduxjs/toolkit';

const ancedoteSlice = createSlice({
  name: 'ancedotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find(n => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const {addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes} = ancedoteSlice.actions;
export default ancedoteSlice.reducer;