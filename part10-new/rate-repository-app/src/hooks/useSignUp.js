import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

export default function useSignUp() {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data, ...response } = await mutate({
      variables: { user: { username, password } },
    });

    return { createUser: data.createUser, ...response };
  };

  return [signUp, result];
}
