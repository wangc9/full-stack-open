import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/Query';

const useRepositories = () => {
  const {data, error, loading} = useQuery(GET_REPOSITORIES);

  return data;
};

export default useRepositories;