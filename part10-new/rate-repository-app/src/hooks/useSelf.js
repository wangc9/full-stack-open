import { useQuery } from '@apollo/client';
import { GET_SELF } from '../graphql/queries';

export default function useSelf() {
  const { data, ...result } = useQuery(GET_SELF, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    username: data.me === null ? undefined : data.me.username,
    ...result,
  };
}
