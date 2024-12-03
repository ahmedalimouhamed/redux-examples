import {gql} from 'graphql-tools';

const bookTypeDefs = gql `
  type Book{
    id: ID!
    title: String!
    genre: Genre!
    author: Author!
    reviews: [Review]
    inventory: Inventory
  }

  type Query{
    books: [Book]
    bookId(id: ID): Book
  }

  type Mutation{
    addBook(title: String!, genre: String! author: ID!): Book
    updateBook(id: ID!, title: String, genre: String, author: ID): Book
    deleteBook(id: ID!): String
  }
`;

const bookResolvers = {
  Query: {
    books: async(_, __, {models}) => {
      return models.Book.find().populate('author');
    },

    book: async(_, {id}, {models}) => {
      return models.Book.findById(id).populate('author');
    }
  },

  Mutation: {
    addBook: async(_, {title, genre, author}, {models}) => {
      const book = new models.Book({title, genre, author});
      return book.save();
    },

    updateBook: async(_, {id, title, genre, author}, {models}) => {
      return models.Book.findByIdAndUpdate(
        id,
        {title, genre, author},
        {new: true}
      );
    },

    deleteBook: async(_, {id}, {models}) => {
      await models.Book.findByIdAndDelete(id);
      return `Book with ID ${id} deleted`;
    }
  }
}

export default {bookTypeDefs, bookResolvers}