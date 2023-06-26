const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const MONGOBD_URI = process.env.MONGODB_URI;
console.log('connecting to', MONGOBD_URI);
mongoose.connect(MONGOBD_URI).then(() => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.log('error connection to MongoDB', error.message);
});

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String = "", genre: String = ""): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ) : Book
    addAuthor(
      name: String!
      born: Int
      bookCount: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author !== "" && args.genre !== "") {
        const author = await Author.findOne({name: args.author});
        const result = await Book.find({
          author: {$in: author.id},
          genres: {$in: [args.genre]}
        }).populate("author");
        return result;
      } else if (args.author !== "") {
        const author = await Author.findOne({name: args.author});
        const result = await Book.find({
          author: {$in: author.id}
        }).populate("author");
        return result;
      } else if (args.genre !== "") {
        const result = await Book.find({
          genres: {$in: [args.genre]}
        }).populate("author");
        return result;
      } else {
        const result = await Book.find({}).populate("author");
        return result;
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Author: {
    bookCount: async (root) => await Book.find({author: root.id}).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }
      let author = await Author.findOne({name: args.author});
      if (!author) {
        const newAuthor = new Author({
          name: args.author
        });
        try {
          await newAuthor.save();
          author = await Author.findOne({name: args.author});
        } catch (error) {
          throw new GraphQLError('Saving new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          });
        }
      }
      const book = new Book({ ...args, author: author.id });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        });
      }
      return book.populate("author");
    },
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving new author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }
      return author;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }
      const author = Author.findOne({name: args.name});
      if (author === null) {
        return null;
      } else {
        try {
          const updatedAuthor = await Author.findOneAndUpdate(
            {name: args.name},
            {born: args.setBornTo},
            {new: true}
          );
          return updatedAuthor;
        } catch (error) {
          throw new GraphQLError('Updating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          });
        }
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      await user.save().catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      });
      console.log(user);
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {value: jwt.sign(userForToken, process.env.SECRET)};
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('bearer ')) {
      const decodedToken = jwt.verify(
          auth.substring(7), process.env.SECRET
      );
      const currentUser = await User.findById(decodedToken.id)

      return {currentUser};
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
});
