import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from './RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const [first, second] = screen.getAllByTestId('repositoryItem');

      expect(within(first).getByTestId('fullname')).toHaveTextContent(
        'jaredpalmer/formik'
      );
      expect(within(first).getByTestId('description')).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(within(first).getByTestId('language')).toHaveTextContent(
        'TypeScript'
      );
      expect(within(first).getByTestId('fork-count')).toHaveTextContent('1.6k');
      expect(within(first).getByTestId('star-count')).toHaveTextContent(
        '21.9k'
      );
      expect(within(first).getByTestId('rating')).toHaveTextContent('88');
      expect(within(first).getByTestId('review-count')).toHaveTextContent('3');

      expect(within(second).getByTestId('fullname')).toHaveTextContent(
        'async-library/react-async'
      );
      expect(within(second).getByTestId('description')).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      expect(within(second).getByTestId('language')).toHaveTextContent(
        'JavaScript'
      );
      expect(within(second).getByTestId('fork-count')).toHaveTextContent('69');
      expect(within(second).getByTestId('star-count')).toHaveTextContent(
        '1.8k'
      );
      expect(within(second).getByTestId('rating')).toHaveTextContent('72');
      expect(within(second).getByTestId('review-count')).toHaveTextContent('3');
    });
  });
});
