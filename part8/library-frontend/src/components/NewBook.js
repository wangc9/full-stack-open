import {useState} from 'react';
import {useField} from '../hooks';
import {useMutation} from '@apollo/client';
import {ADD_BOOK, ALL_BOOKS} from './queries';
import {Button, TextField} from '@mui/material';
import Notification from './Notification';

const NewBook = () => {
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const published = useField('text', 'published');
  const genre = useField('text', 'genre');
  const [genres, setGenres] = useState([]);
  const [errormsg, setErrormsg] = useState('')

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors;
      const message = Object.values(errors).map(e => e.message).join('/n');
      setErrormsg(`Error: ${message}`);
      setTimeout(() => {setErrormsg('')}, 3000);
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres
      }
    });

    setErrormsg(`SUCCESS: You have added a book ${title.value} by ${author.value}`);
    title.clearValue();
    author.clearValue();
    published.clearValue();
    setGenres([])
    genre.clearValue();
    setTimeout(() => {setErrormsg('')}, 3000);
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    genre.clearValue();
  };

  return (
    <div>
      {errormsg !== '' && (<Notification message={errormsg} />)}
      <br />
      <form onSubmit={submit}>
        <div>
          <TextField
            label={title.name}
            id={title.id}
            name={title.name}
            value={title.value}
            onChange={title.onChange}
          />
        </div>
        <br />
        <div>
          <TextField
            label={author.name}
            id={author.id}
            name={author.name}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <br />
        <div>
          <TextField
            label={published.name}
            id={published.id}
            name={published.name}
            value={published.value}
            onChange={published.onChange}
          />
        </div>
        <br />
        <div>
          <TextField
            label={genre.name}
            id={genre.id}
            name={genre.name}
            value={genre.value}
            onChange={genre.onChange}
          />
          {' '}
          <Button
              onClick={addGenre}
              type="button"
              id="genre-button"
              variant="contained"
              color="primary"
          >
            <b>add genre</b>
          </Button>
        </div>
        <br />
        <div>genres: {genres.join(' ')}</div>
        <br />
        <Button
            type="submit"
            id="create-button"
            variant="contained"
            color="primary"
        >
          <b>create book</b>
        </Button>
      </form>
    </div>
  )
}

export default NewBook