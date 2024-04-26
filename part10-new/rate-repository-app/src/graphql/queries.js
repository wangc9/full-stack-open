import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          description
          forksCount
          language
          openIssuesCount
          ownerAvatarUrl
          reviewCount
          ratingAverage
          stargazersCount
          fullName
          id
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      description
      forksCount
      fullName
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_SELF = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repository {
              fullName
              id
            }
            text
            rating
            createdAt
          }
        }
      }
    }
  }
`;
