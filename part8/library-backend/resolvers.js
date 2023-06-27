const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book');
const Author = require('./models/author');
const {GraphQLError} = require('graphql/index');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

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
    },
    allGenres: async () => {
      const books = await Book.find({});
      let genres = books.map((book) => book.genres).reduce((a, b) => a.concat(b), []);
      let result = [...new Set(genres)];

      return result;
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
      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate("author") })
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
};

module.exports = resolvers;
