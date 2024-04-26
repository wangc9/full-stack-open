import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

export default function useDeleteReview() {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const { data, ...response } = await mutate({
      variables: {
        deleteReviewId: id,
      },
    });

    return { ...response };
  };

  return [deleteReview, result];
}
