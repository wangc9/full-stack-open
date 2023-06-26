import {Link, Route, Routes} from 'react-router-dom';
import {AppBar, Button, Container, Toolbar} from '@mui/material';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {
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
            <Button color="inherit" component={Link} to="create">
              <b>add books</b>
            </Button>
          </Toolbar>
        </AppBar>
        {false && (
          <div>
            <Link to="/authors">authors</Link>
            <Link to="/books">books</Link>
            <Link to="/create">add books</Link>
          </div>
        )}
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/create" element={<NewBook />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
