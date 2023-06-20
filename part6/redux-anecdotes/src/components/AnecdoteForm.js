import {useDispatch} from 'react-redux';
import {addNewAnecdote} from '../reducers/anecdoteReducer';
import React from 'react';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addNewAnecdote(content));
  };

  return (
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
  );
};

export default AnecdoteForm;
