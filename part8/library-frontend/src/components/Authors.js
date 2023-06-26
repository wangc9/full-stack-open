import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {useMutation, useQuery} from '@apollo/client';
import Notification from './Notification';
import {ALL_AUTHORS, CHANGE_BIRTHYEAR} from './queries';
import {useField} from '../hooks';
import {useState} from 'react';

const Authors = (props) => {
  const author = useField('text', 'author');
  const birthyear = useField('text', 'birthyear');
  const [errormsg, setErrormsg] = useState('');
  const [changeBirth] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors;
      const message = Object.values(errors).map(e => e.message).join('/n');
      setErrormsg(`Error: ${message}`);
      setTimeout(() => {setErrormsg('')}, 3000);
    }
  });

  const changeBirthyear = (event) => {
    event.preventDefault();
    changeBirth({
      variables: {
        name: author.value,
        setBornTo: Number(birthyear.value),
      }
    });
    birthyear.clearValue();
    author.clearValue();
  };
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  };
  const authors = result.data.allAuthors || [];

  return (
    <div>
      {errormsg !== '' && (
        <Notification message={errormsg} />
      )}
      <h2>authors</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell> </TableCell>
            <TableCell><b>born</b></TableCell>
            <TableCell><b>books</b></TableCell>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.born ? author.born : ''}</TableCell>
                <TableCell>{author.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Set birthyear</h3>
      <FormControl margin="dense" fullWidth>
        <form onSubmit={changeBirthyear}>
          <InputLabel id="author-select">{author.name}</InputLabel>
          <Select
            labelId="author-select"
            id={author.id}
            value={author.value}
            label={author.name}
            onChange={author.onChange}
          >
            {authors.map((author) => (
              <MenuItem key={author.name} value={author.name}>{author.name}</MenuItem>
            ))}
          </Select>
          <br />
          <div>
            <TextField
              id={birthyear.id}
              label={birthyear.name}
              name={birthyear.name}
              value={birthyear.value}
              onChange={birthyear.onChange}
            />
          </div>
          <br />
          <Button
            id="birthyear-button"
            type="submit"
            variant="contained"
            color="primary"
          >
            <b>update author</b>
          </Button>
        </form>
      </FormControl>
    </div>
  )
}

export default Authors
