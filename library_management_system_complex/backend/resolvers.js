import Book from './models/Book.js';
import Author from './models/Author.js';
import Reader from './models/Reader.js';
import BorrowingRecord from './models/BorrowingRecord.js';
import Review from './models/Review.js';
import Genre from './models/Genre.js';
import mongoose from 'mongoose';

export const resolvers = {
  Query: {
    books: async () => {
      try {
        return await Book.find().populate('author genre');
      } catch (error) {
        throw new Error('Error fetching books: ' + error.message);
      }
    },
    book: async (_, { id }) => {
      try {
        return await Book.findById(id).populate('author genre');
      } catch (error) {
        throw new Error('Error fetching book: ' + error.message);
      }
    },
    authors: async () => {
      try {
        return await Author.find();
      } catch (error) {
        throw new Error('Error fetching authors: ' + error.message);
      }
    },
    author: async (_, { id }) => {
      try {
        return await Author.findById(id);
      } catch (error) {
        throw new Error('Error fetching author: ' + error.message);
      }
    },
    readers: async () => {
      try {
        return await Reader.find();
      } catch (error) {
        throw new Error('Error fetching readers: ' + error.message);
      }
    },
    reader: async (_, { id }) => {
      try {
        return await Reader.findById(id);
      } catch (error) {
        throw new Error('Error fetching reader: ' + error.message);
      }
    },
    genres: async() => {
      try {
        return await Genre.find();
      } catch (error) {
        throw new Error('Error fetching genres: ' + error.message);
      }
    }, 

    genre: async(_, {id}) => {
      try {
        return await Genre.findById(id);
      } catch (error) {
        throw new Error('Error fetching genre: ' + error.message);
      }
    }
  },
  Mutation: {
    addBook: async (_, { title, authorId, genreId }) => {
      try {
        const book = new Book({
          title,
          author: authorId,
          genre: genreId
        });
        await book.save();
        return await book.populate('author genre');
      } catch (error) {
        throw new Error('Error adding book: ' + error.message);
      }
    },
    addAuthor: async (_, { name, age }) => {
      try {
        console.log('Creating author with name:', name, 'age:', age);
        const author = new Author({ name, age });
        const savedAuthor = await author.save();
        console.log('Author saved:', savedAuthor);
        return savedAuthor;
      } catch (error) {
        console.error('Error in addAuthor:', error);
        throw new Error('Error adding author: ' + error.message);
      }
    },
    addGenre: async (_, { name, description, books }) => {
      try {
        console.log('Creating genre with name:', name,  'books: ',books);
        const genre = new Genre({ name, description, books });
        const savedGenre = await genre.save();
        console.log('Genre saved:', savedGenre);
        if (books && books.length > 0) {
          const bookInstances = books.map((book) => ({
            title: book.title,
            author: book.authorId,
            genre: genre._id, 
          }));
    
          await models.Book.insertMany(bookInstances);
        }
    
        return await genre.populate('books');
      } catch (error) {
        console.error('Error in addGenre:', error);
        throw new Error('Error adding genre: ' + error.message);
      }
    },
    addReader: async (_, { name, email }) => {
      try {
        const reader = new Reader({ name, email });
        return await reader.save();
      } catch (error) {
        throw new Error('Error adding reader: ' + error.message);
      }
    },
    borrowBook: async (_, { readerId, bookId, dueDate }) => {
      try {
        if (typeof readerId !== 'string') {
          throw new Error('Invalid reader ID');
        }
        if (typeof bookId !== 'string') {
          throw new Error('Invalid book ID');
        }
    
        const borrowingRecord = new BorrowingRecord({
          reader: new mongoose.Types.ObjectId(readerId),
          book: new mongoose.Types.ObjectId(bookId),
          borrowDate: new Date(),
          dueDate,
        });
    
        // Save the borrowing record
        const savedRecord = await borrowingRecord.save();
    
        if (!savedRecord) {
          throw new Error('Failed to save the borrowing record.');
        }
    
        // Fetch and populate the saved record
        const populatedRecord = await BorrowingRecord.findById(savedRecord._id)
          .populate('reader')
          .populate({
            path: 'book', // Populate Book
            populate: [
              { path: 'author' }, // Nested populate for Author in Book
              { path: 'genre' },  // Nested populate for Genre in Book
            ],
          })
          .exec();
    
        if (!populatedRecord) {
          throw new Error('Failed to fetch the borrowing record after saving.');
        }
    
        return {
          id: populatedRecord._id.toString(),
          reader: {
            ...populatedRecord.reader.toObject(),
            id: populatedRecord.reader._id.toString(),
          },
          book: {
            ...populatedRecord.book.toObject(),
            id: populatedRecord.book._id.toString(),
            author: {
              ...populatedRecord.book.author.toObject(),
              id: populatedRecord.book.author._id.toString(),
            },
            genre: {
              ...populatedRecord.book.genre.toObject(),
              id: populatedRecord.book.genre._id.toString(),
            }
          },
          borrowDate: populatedRecord.borrowDate,
          dueDate: populatedRecord.dueDate,
        };
      } catch (error) {
        throw new Error('Error borrowing book: ' + error.message);
      }
    },        
    
    returnBook: async (_, { borrowingRecordId }) => {
      try {
        const record = await BorrowingRecord.findById(borrowingRecordId);
        if (!record) {
          throw new Error('Borrowing record not found');
        }
        record.returnDate = new Date();
        return await record.save();
      } catch (error) {
        throw new Error('Error returning book: ' + error.message);
      }
    },
    addReview: async (_, { bookId, readerId, rating, comment }) => {
      try {
        const review = new Review({
          book: bookId,
          reader: readerId,
          rating,
          comment
        });
        return await review.save();
      } catch (error) {
        throw new Error('Error adding review: ' + error.message);
      }
    },
  },
  Book: {
    reviews: async (parent) => {
      return await Review.find({ book: parent.id });
    },
  },
  Author: {
    books: async (parent) => {
      return await Book.find({ author: parent.id });
    },
  },
  Reader: {
    borrowingRecords: async (parent) => {
      return await BorrowingRecord.find({ reader: parent.id });
    },
    reviews: async (parent) => {
      return await Review.find({ reader: parent.id });
    },
  },
};
