import React from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App