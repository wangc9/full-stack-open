import {useApolloClient, useMutation} from '@apollo/client';
import {useAuthStorage} from './useAuthStorage';
import {SIGN_IN} from '../graphql/Mutation';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const signIn = async ({username, password}) => {
    const data = await mutate({
      variables:{
        credentials: {
          username: username,
          password: password,
        }
      }
    });
    console.log(data.data.authenticate.accessToken);
    await authStorage.setAccessToken(data.data.authenticate.accessToken)
    await client.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
