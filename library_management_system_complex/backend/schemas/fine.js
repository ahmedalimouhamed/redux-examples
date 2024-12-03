import {gql} from 'graphql-tools';

const fineTypeDefs = gql `
  type Fine{
    id: ID!
    amount: Number!
    borrowingRecord: BorrowingRecord!
    paid: Boolean!
  }

  type Query{
    fines: [Fine]
    fine(id: ID!): Fine
  }

  type Mutation{
    addFine(amount: Number!, borrowingRecord:BorrowingRecord!, paid: Boolean!): Fine
    updateFine(id: ID!, amount: Number!, borrowingRecord:BorrowingRecord!, paid: Boolean!): Fine
    deleteFine(id: ID!): String
  }
`;


const fineResolvers = {
  Query: {
    fines: async(_, __, {models}) => {
      return models.Fine.find();
    },

    fine: async(_, {id}, {models}) => {
      return models.Fine.findById(id);
    }
  },

  Mutation: {
    addFine: async(_, {amount, borrowingRecord, paid}, {models}) => {
      const fine = new models.Fine({amount, borrowingRecord, paid});
      return fine.save();
    },

    updateFine: async(_, {id, amount, borrowingRecord, paid}, {models}) => {
      return models.Fine.findByIdAndUpdate(
        id, 
        {amount, borrowingRecord, paid},
        {new: true}
      );
    },

    deleteFine: async(_, {id}, {models}) => {
      await models.Fine.findByIdAndDelete(id);
      return `Fine with ID ${id} deleted`;
    }
  }
};

export default {fineTypeDefs, fineResolvers};
