import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES {
    repositories {
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
        }
      }
    }
  }
`;

export const GET_SELF = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
