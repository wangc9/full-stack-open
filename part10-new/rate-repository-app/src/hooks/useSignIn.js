import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

export default function useSignIn() {
  const tokenStorage = new AuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data, ...response } = await mutate({
      variables: { credentials: { username, password } },
    });

    await tokenStorage.setAccessToken(data.authenticate.accessToken);

    return { authenticate: data.authenticate, ...response };
  };

  return [signIn, result];
}
