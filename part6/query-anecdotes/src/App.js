import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getAnecdotes, updateAnecdote} from './request';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote);
      queryClient.setQueriesData('anecdotes', updatedAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    updateAnecdoteMutation.mutate(newAnecdote);
  };

  const result = useQuery('anecdotes', getAnecdotes, {retry: false});

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  } else {
    const anecdotes = result.data;

    return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
