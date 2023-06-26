import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {useQuery} from '@apollo/client';
import {ALL_AUTHORS} from './queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) {
    return <div>loading...</div>;
  };
  const authors = result.data.allAuthors || [];

  return (
    <div>
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
    </div>
  )
}

export default Authors
