import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

export default function useSignIn() {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data, ...response } = await mutate({
      variables: { credentials: { username, password } },
    });

    return { authenticate: data.authenticate, ...response };
  };

  return [signIn, result];
}
