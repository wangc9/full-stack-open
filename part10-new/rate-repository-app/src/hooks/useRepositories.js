import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, value) => {
  let orderBy;
  let orderDirection;
  switch (order) {
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
  }
  const { data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword: value },
  });

  return {
    repositories: data ? data.repositories : undefined,
    refetch,
  };
};

export default useRepositories;
