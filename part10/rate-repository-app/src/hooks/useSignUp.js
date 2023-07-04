import {useMutation} from '@apollo/client';
import {SIGN_UP} from '../graphql/Mutation';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);
  const userSignUp = async ({username, password, confirm}) => {
    const data = mutate({
      variables: {
        user: {
          username,
          password,
        }
      }
    });

    return data;
  };

  return [userSignUp, result];
};

export default useSignUp;
