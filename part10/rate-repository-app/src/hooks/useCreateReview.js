import {useApolloClient, useMutation} from '@apollo/client';
import {CREATE_REVIEW} from '../graphql/Mutation';
import {useAuthStorage} from './useAuthStorage';
import {useEffect, useState} from 'react';

const useCreateReview = () => {
  const [token, setToken] = useState('');
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(CREATE_REVIEW);
  useEffect(() => {
    const getToken = async () => {
      const response = await authStorage.getAccessToken();
      return response;
    };
    getToken().then(res => setToken(`Bearer ${res}`));
  }, [authStorage.getAccessToken()])
  console.log('token: ', token);
  const createReview = async ({username, name, rating, review}) => {
    console.log(username, name, rating, review);
    const numRating = Number(rating);
    const data = await mutate({
      variables: {
        review: {
          ownerName: username,
          rating: numRating,
          repositoryName: name,
          text: review
        }
      },
      context: {
        headers: {
          authorization: token
        }
      }
    });
    // await client.resetStore();
    console.log(data);
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
