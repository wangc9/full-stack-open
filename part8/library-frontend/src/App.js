import {Link, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useApolloClient, useQuery} from '@apollo/client';
import {AppBar, Button, Container, Toolbar} from '@mui/material';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Recommendation from './components/Recommendation';
import {ME} from './components/queries';

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    if (user) {
      console.log(token);
      setMessage(`SUCCESS: Hi ${user.username}! Welcome back!`);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      setMessage(`SUCCESS: You have logged out`);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [user])

  const me = useQuery(ME, {
    skip: !localStorage.getItem("user-token")
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setUser(null);
  };

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
            {user === null ? (
              <Button color="inherit" component={Link} to="/login">
                <b>login</b>
              </Button>
            ) : (
              <div>
                <Button color="inherit" component={Link} to="/create">
                  <b>add books</b>
                </Button>
                <Button color="inherit" component={Link} to="/recommend">
                  <b>recommend</b>
                </Button>
                <Button
                  type="button"
                  id="logout-button"
                  color="inherit"
                  onClick={logout}
                >
                  <b>{user} logout</b>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {false && (
          <div>
            <Link to="/authors">authors</Link>
            <Link to="/books">books</Link>
            <Link to="/create">add books</Link>
            <Link to="/recommend">recommend</Link>
            <Link to="/login">login</Link>
          </div>
        )}
        <Routes>
          <Route path="/" element={
            <div>
              <h2>Library app</h2>
              <p>For information about books on shelf, please click the corresponding menu</p>
            </div>
          } />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/create" element={<NewBook />} />
          <Route path="/recommend" element={<Recommendation me={me}/>} />
          <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser} />} />
        </Routes>
        <Notification message={message} />
      </div>
    </Container>
  )
}

export default App
