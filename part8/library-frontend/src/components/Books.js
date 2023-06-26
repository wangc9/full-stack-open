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
import {ALL_BOOKS} from './queries';

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <div>loading...</div>;
  };
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell> </TableCell>
            <TableCell><b>author</b></TableCell>
            <TableCell><b>published</b></TableCell>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Books
