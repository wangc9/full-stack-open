import {useDispatch, useSelector} from 'react-redux';
import {voteAnecdote} from '../reducers/anecdoteReducer';
import React from 'react';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      )}
    </ul>
  );
};

export default Anecdotes;
