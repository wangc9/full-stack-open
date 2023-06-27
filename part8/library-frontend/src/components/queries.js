import {gql} from '@apollo/client';

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres 
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      id
    }
  }
`;

export const CHANGE_BIRTHYEAR = gql`
  mutation changeBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`;
