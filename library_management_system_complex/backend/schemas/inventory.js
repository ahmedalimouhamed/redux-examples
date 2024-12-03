/*
book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
  stock: {type: Number, default:0}
*/


import {gql} from 'graphql-tools';

const inventoryTypeDefs = gql `
  type Inventory{
    id: ID!
    book: Book!
    stock: Int!
  }

  type Query{
    inventorys: [Inventory]
    inventory(id: ID!): Inventory
  }

  type Mutation{
    addInventory(book: Book!, stock: Int!): Inventory
    updateInventory(id: ID!,book: Book, stock: Int): Inventory
    deleteInventory(id: ID!): String
  }
`;


const inventoryResolvers = {
  Query: {
    inventorys: async(_, __, {models}) => {
      return models.Inventory.find();
    },

    inventory: async(_, {id}, {models}) => {
      return models.Inventory.findById(id);
    }
  },

  Mutation: {
    addInventory: async(_, {book, stock}, {models}) => {
      const inventory = new models.Inventory({book, stock});
      return inventory.save();
    },

    updateInventory: async(_, {id, book, stock}, {models}) => {
      return models.Inventory.findByIdAndUpdate(
        id, 
        {book, stock},
        {new: true}
      );
    },

    deleteInventory: async(_, {id}, {models}) => {
      await models.Inventory.findByIdAndDelete(id);
      return `Inventory with ID ${id} deleted`;
    }
  }
};

export default {inventoryTypeDefs, inventoryResolvers};
