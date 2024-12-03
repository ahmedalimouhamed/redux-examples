import {gql} from 'graphql-tools';

const borrowingRecordTypeDefs = gql `
  type BorrowingRecord{
    id: ID!
    reader: Reader!
    book: Book!
    borrowedDate: Date!
    dueDate: Date!
    fine: Fine
  }

  type Query{
    borrowingRecords: [BorrowingRecord]
    borrowingRecord(id: ID!): BorrowingRecord
  }
`;

const borrowingRecordResolvers = {
  Query: {
    borrowingRecords: async(_, __, {models}) => {
      return models.BorrowingRecord.find();
    },

    borrowingRecord: async(_, {id}, {models}) => {
      return models.BorrowingRecord.findById(id);
    }
  },

  Mutation: {
    addBorrowingRecord: async(_, {reader, book, borrowedDate, dueDate}, {models}) => {
      const borroweingRecord = new models.borroweingRecord({reader, book, borrowedDate, dueDate});
      return borroweingRecord.save();
    },

    updateBorrowingRecord: async(_, {id, reader, book, borrowedDate, dueDate}, models) => {
      return models.BorrowingRecord.findByIdAndUpdate(
        id,
        {reader, book, borrowedDate, dueDate},
        {new: true}
      )
    },

    deleteBorrowingRecord: async(_, {id}, {models}) => {
      await models.BorrowongRecords.fincByIdAndDelete(id);
      return `Borrowening redord with id ${id} deleted`;
    }
  }
}

export default {borrowingRecordTypeDefs, borrowingRecordResolvers};