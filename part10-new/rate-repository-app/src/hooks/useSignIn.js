import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

export default function useSignIn() {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data, ...response } = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);

    await apolloClient.resetStore();

    return { authenticate: data.authenticate, ...response };
  };

  return [signIn, result];
}
