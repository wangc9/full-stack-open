import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

export default function useCreateReview() {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createNewReview = async ({ owner, name, rating, review }) => {
    const { data, ...response } = await mutate({
      variables: {
        review: {
          ownerName: owner,
          repositoryName: name,
          rating: parseInt(rating),
          text: review,
        },
      },
    });

    return { createReview: data.createReview, ...response };
  };

  return [createNewReview, result];
}
