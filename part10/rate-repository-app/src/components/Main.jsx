import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import {Route, Routes} from 'react-router-native';
import SignIn from './SignIn';
import Card from './Card';
import ReviewForm from './ReviewForm';
import Text from './Text';
import SignUp from './SignUp';

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path='/' element={
          <>
            <Text fontWeight='bold'>Welcome! This is an app for reviewing selected repositories. You can sign-up or sign-in and create review for your favourite repositories.</Text>
          </>
        } />
        <Route path='/sign_in' element={<SignIn />} Sign-In />
        <Route path='/sign_up' element={<SignUp />} Sign-Up />
        <Route path='/repositories' element={<RepositoryList />} Repositories />
        <Route path='/create_review' element={<ReviewForm />} Review />
        <Route path='/repositories/:id' element={<Card item={''} inList={false} />} />
      </Routes>
    </>
  );
};

export default Main;