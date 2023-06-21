import {useMutation, useQueryClient} from 'react-query';
import {createAnecdote} from '../request';
import {useNotificationDispatch} from './NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueriesData('anecdotes', anecdotes.concat(newAnecdote));
    },
  });

  const dispatch = useNotificationDispatch();

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({
      content,
      votes: 0,
    });
    dispatch({
      type: 'CREATE',
      payload: content,
    });
    setTimeout(() => {
      dispatch({
        type: '',
      })
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
