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