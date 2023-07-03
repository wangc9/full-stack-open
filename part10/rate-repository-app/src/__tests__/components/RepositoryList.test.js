import {RepositoryListContainer} from '../../components/RepositoryList';
import {render, screen, within} from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        repositories: {
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
        }
      };

      // Add your test code here
      render(<RepositoryListContainer data={repositories} />);
      const repositoryItems = screen.getAllByTestId('cardItem');
      const testItem = repositoryItems[0];
      expect(within(testItem).getByTestId('info')).toHaveTextContent('jaredpalmer/formikBuild forms in React, without the tearsTypeScript');
      expect(within(testItem).getByTestId('stars')).toHaveTextContent('21.9kStars');
      expect(within(testItem).getByTestId('forks')).toHaveTextContent('1.6kForks');
      expect(within(testItem).getByTestId('reviews')).toHaveTextContent('3Reviews');
      expect(within(testItem).getByTestId('rating')).toHaveTextContent('88Rating');

      const testItem2 = repositoryItems[1];
      expect(within(testItem2).getByTestId('info')).toHaveTextContent('async-library/react-asyncFlexible promise-based React data loaderJavaScript');
      expect(within(testItem2).getByTestId('stars')).toHaveTextContent('1.8kStars');
      expect(within(testItem2).getByTestId('forks')).toHaveTextContent('0.1kForks');
      expect(within(testItem2).getByTestId('reviews')).toHaveTextContent('3Reviews');
      expect(within(testItem2).getByTestId('rating')).toHaveTextContent('72Rating');
    });
  });
});
