import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import {Route, Routes} from 'react-router-native';
import SignIn from './SignIn';
import Card from './Card';

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/sign_in' element={<SignIn />} Sign-In />
        <Route path='/repositories' element={<RepositoryList />} Repositories />
        <Route path='/repositories/:id' element={<Card item={''} inList={false} />} />
      </Routes>
    </>
  );
};

export default Main;