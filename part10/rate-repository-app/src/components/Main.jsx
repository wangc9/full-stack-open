import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import {Route, Routes} from 'react-router-native';
import SignIn from './SignIn';

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/sign_in' element={<SignIn />} Sign-In />
        <Route path='/repositories' element={<RepositoryList />} Repositories />
      </Routes>
    </>
  );
};

export default Main;