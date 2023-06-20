import {useDispatch} from 'react-redux';
import React from 'react';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  return (
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
  );
};

export default NewAnecdote;
