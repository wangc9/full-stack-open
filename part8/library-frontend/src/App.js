import {useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {AppBar, Button, Container, Toolbar} from '@mui/material';
import Authors from './components/Authors';
import Books from './components/Books';

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/authors">
              <b>authors</b>
            </Button>
            <Button color="inherit" component={Link} to="/books">
              <b>books</b>
            </Button>
          </Toolbar>
        </AppBar>
        {false && (
          <div>
            <Link to="/authors">authors</Link>
            <Link to="/books">books</Link>
          </div>
        )}
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
        </Routes>
        {/*<div>*/}
        {/*  <button onClick={() => setPage('authors')}>authors</button>*/}
        {/*  <button onClick={() => setPage('books')}>books</button>*/}
        {/*  <button onClick={() => setPage('add')}>add book</button>*/}
        {/*</div>*/}
        {/*<NewBook show={page === 'add'} />*/}
      </div>
    </Container>
  )
}

export default App
