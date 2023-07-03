import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          description
          forksCount
          language
          ratingAverage
          reviewCount
          url
          ownerAvatarUrl
          stargazersCount
          fullName
          id
        }
      }
    }
  }
`;

export const GET_REPO = gql`
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

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;