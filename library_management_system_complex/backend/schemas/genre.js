import {gql} from 'graphql-tools';

const genreTypeDefs = gql `
  type Genre {
    id: ID!
    name: String!
    description: String
    books: [Book]
  }

  type Query {
    genres: [Genre]
    genre(id: ID!): Genre
  }

  type Mutation{
    addGenre(name: String!, description:String!): Genre
    updateGenre(id: ID!, name: String!, description:String!): Genre
    deleteGenre(id: ID!): String
  }
`;

const GenreResolvers = {
  Query: {
    genres: async(_, __, {models}) => {
      return models.Genre.find().populate('books');
    },

    genre: async (_, {id}, {models}) => {
      return models.Genre.findById(id).populate('books')
    }
  },

  Mutation: {
    addGenre: async(_, {name, description}, {models}) => {
      const genre = new models.Genre({name, description});
      return genre.save();
    },

    updateGenre: (_, {id, name, description}, {models}) => {
      return models.Genre.findByIdAndUpdate(
        id,
        {name, description},
        {new: true}
      )
    },

    deleteGenre: async(_, {id}, {models}) => {
      await models.Genre.findByIdAndDelete(id);
      return `Genre with ID ${id} deleted`;
    }
  }
}

export default {genreTypeDefs, genreResolvers};