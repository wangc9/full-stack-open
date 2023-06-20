import {useDispatch, useSelector} from 'react-redux';
import {voteAnecdote} from '../reducers/anecdoteReducer';
import {
  clearNotification,
  voteNotification,
} from '../reducers/notificationReducer';

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

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter));
    }
  });

  const compareVotes = (anecdote1, anecdote2) => {
    return (anecdote2.votes - anecdote1.votes);
  };

  const arrayForSort = [...anecdotes];
  arrayForSort.sort(compareVotes);

  return (
    <ul>
      {arrayForSort.map(anecdote =>
        <Anecdote
          anecdote={anecdote}
          handleClick={async () => {
            dispatch(voteAnecdote(anecdote.id));
            dispatch(voteNotification(anecdote.content));
            await new Promise(resolve => setTimeout(resolve, 1000));
            dispatch(clearNotification());
          }}
        />
      )}
    </ul>
  );
};

export default AnecdoteList;
