import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID} from 'graphql';
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Publisher from '../models/Publisher.js';
import Reader from '../models/Reader.js';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    genre: {type: GraphQLString},
    publishedYear: {type: GraphQLInt},
    author: {
      type: AuthorType,
      resolve: async(parent) => {
        try{
          return await Author.findById(parent.author)
        }catch(err){
          console.error('Error fetching author ',err);
          return null;
        }
      },
    },
    publisher: {
      type: PublisherType,
      resolve: async(parent) => {
        try{
          return await Publisher.findById(parent.publisher)
        }catch(err){
          console.error('Error fetching publisher ',err);
          return null;
        }
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve: async(parent) => {
        try{
          const books = await Book.find({author: parent.id});
          return books || [];
        }catch(err){
          console.error('Error fetching books ', err);
          throw new Error('failed fetch books');
        }
      }
    }
  })
});

const PublisherType = new GraphQLObjectType({
  name: 'Publisher',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    location: {type: GraphQLString},
    book: {
      type: BookType,
      resolve: async(parent) => {
        try{
          return await Book.findOne({publisher: parent.id});
        }catch(err){
          console.error('Error fetching book by id ', err);
          return null;
        }
      } 
    }
  })
});

const ReaderType = new GraphQLObjectType({
  name: 'Reader',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    borrowedBooks: {
      type: new GraphQLList(BookType),
      resolve: async(parent) => {
        try{
          return await Book.find({_id: {$in: parent.borrowedBooks}});
        }catch(err){
          console.error('error fetching borrowed books ', err)
          return null;
        }
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: async() => {
        try{
          const books = await Book.find();
          return books || [];
        }catch(err){
          console.error('error fetching books', err);
          return null;
        }
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async() => {
        try{
          const authors = await Author.find();
          return authors || [];
        }catch(err){
          console.error('error fetching authors ', err);
          throw new Error('failed to fetch authors');
        }
      }
    },

    publishers:{
      type: new GraphQLList(PublisherType),
      resolve: async() => {
        try{
          const publishers = await Publisher.find();
          return publishers || [];
        }catch(err){
          consolr.error('error fetching publishers ', err);
        }
      }
    },

    readers: {
      type: new GraphQLList(ReaderType),
      resolve: async() => {
        try{
          const readers = await Reader.find();
          return readers || [];
        }catch(err){
          console.error("error fetching readers ", err)
        }
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve: async(_, args) => {
        try {
          const author = new Author(args);
          console.log("author to add ", author);
          return await author.save();
        } catch (error) {
          console.error('Error creating author:', error);
          throw new Error('Failed to create author');
        }
      }
    },
    addPublisher: {
      type: PublisherType,
      args: {
        name: {type: GraphQLString},
        location: {type: GraphQLString}
      },
      resolve: async(_, args) => {
        try{
          const publisher = new Publisher(args);
          return await publisher.save();
        }catch(err){
          console.error('Error creating publisher:', error);
          throw new Error('Failed to create publisher');
        }
      }
    },
    addBook: {
      type: BookType, 
      args: {
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        publishedYear: {type: GraphQLInt},
        author: {type: GraphQLID},
        publisher: {type: GraphQLID}
      },
      resolve: async(_, args) => {
        try{
          const book = new Book(args);
          return await book.save();
        }catch(err){
          console.error('Error creating book:', error);
          throw new Error('Failed to create book');
        }
      }
    },

    addReader: {
      type: ReaderType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        borrowedBooks: {type: new GraphQLList(GraphQLID)}
      },
      resolve: async(_, args) => {
        try{
          const reader = new Reader(args);
          return await reader.save();
        }catch(err){
          console.error('Error creating reader:', error);
          throw new Error('Failed to create reader');
        }
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
