import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';
import Book from '../models/Book.js';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    publishedYear: { type: GraphQLInt },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        return await Book.find();
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: async (_, args) => {
        return await Book.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        publishedYear: { type: GraphQLInt },
        genre: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        console.log('addBook mutation called');
        console.log('Arguments received:', args);
        const book = new Book(args);
        return await book.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
