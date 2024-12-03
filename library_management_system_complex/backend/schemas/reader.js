import {gql} from 'graphql-tools';

const readerTypeDefs = gql `
  type Reader {
    id: ID!
    name: String!
    borrowedBooks: [Book]
    reviews: [Review]
    fines: [Fine]
  }

  type Query {
    readers: [Reader]
    reader(id: ID!): Reader
  }

  type Mutation{
    addReader(name: String!, email: String!): Reader
    uodateReader(id: ID!, name: String, email: String): Reader
    deleteReader(id: ID!): String
  }
`;

const readerResolvers = {
  Query: {
    readers: async(_, __, {models}) => {
      return models.Reader.find().populate('borrowedBooks');
    },

    reader: async(_, {id}, {models}) => {
      return models.Reader.findById(id).populate('borrowedBooks');
    }
  },

  Mutation: {
    addReader: async(_, {name, email}, {models}) => {
      const reader = new models.Reader({name, email});
      return reader.save();
    },

    updateReader: async(_, {id, name, email}, {models}) => {
      return models.Reader.findByIdAndUpdate(
        id,
        {name, email},
        {new: true}
      );
    },

    deleteReader: async(_, {id}, {models}) => {
      await models.Reader.findByIdAndDelete(id);
      return `Reader with ${id} deleted`;
    }
  }
}

export default {readerTypeDefs, readerResolvers};