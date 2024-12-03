import {gql} from 'graphql-tools';

const authorTypeDefs = gql `
  type Author{
    id: ID!
    name: String!
    age: Int!
    books: [Book]
  }

  type Query{
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation{
    addAuthor(name: String!, age:Int!): Author
    updateAuthor(id: ID!, name: String, age: Int): Author
    deleteAuthor(id: ID!): String
  }
`;


const authorResolvers = {
  Query: {
    authors: async(_, __, {models}) => {
      return models.Author.find();
    },

    author: async(_, {id}, {models}) => {
      return models.Author.findById(id);
    }
  },

  Mutation: {
    addAuthor: async(_, {name, age}, {models}) => {
      const author = new models.Author({name, age});
      return author.save();
    },

    updateAuthor: async(_, {id, name, age}, {models}) => {
      return models.Author.findByIdAndUpdate(
        id, 
        {name, age},
        {new: true}
      );
    },

    deleteAuthor: async(_, {id}, {models}) => {
      await models.Author.findByIdAndDelete(id);
      return `Author with ID ${id} deleted`;
    }
  }
};

export default {authorTypeDefs, authorResolvers};
