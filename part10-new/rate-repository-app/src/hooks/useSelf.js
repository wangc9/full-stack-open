import { useQuery } from '@apollo/client';
import { GET_SELF } from '../graphql/queries';

export default function useSelf(status) {
  const { data, ...result } = useQuery(GET_SELF, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: status },
  });

  return {
    username:
      data === undefined || data.me === null ? undefined : data.me.username,
    data:
      status === false || data === undefined || data.me === null
        ? undefined
        : data.me.reviews.edges,
    ...result,
  };
}
