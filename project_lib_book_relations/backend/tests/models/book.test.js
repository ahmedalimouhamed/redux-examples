import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Book from '../../models/Book';
import Author from '../../models/Author';
import Publisher from '../../models/Publisher'

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await Book.deleteMany();
  await Author.deleteMany();
  await Publisher.deleteMany();
});

test('create a book', async()=> {
  const author = await Author.create({
    name: "J.K. Rowling",
    age: 55
  });

  const publisher = await Publisher.create({
    name: 'Bloomsbury',
    location: 'London'
  });

  const book = await Book.create({
    title: 'Harry Potter and Philosopher\'s Stone',
    genre: 'Fantasy',
    publishedYear: 1997,
    author: author._id,
    publisher: publisher._id
  });

  expect(book.title).toBe('Harry Potter and Philosopher\'s Stone');
  expect(book.genre).toBe('Fantasy');
  expect(book.publishedYear).toBe(1997);
  expect(book.author.toString()).toBe(author._id.toString());
  expect(book.publisher.toString()).toBe(publisher._id.toString());
});

test('find a book by title', async() => {
  const author = await Author.create({
    name: "J.K. Rowling",
    age: 55
  });

  const publisher = await Publisher.create({
    name: 'Bloomsbury',
    location: 'London'
  });

  await Book.create({
    title: 'Harry Potter and the Chamber of Secrets',
    genre: 'Fantasy',
    publishedYear: 1998,
    author: author._id,
    publisher: publisher._id
  });

  const book = await Book.findOne({title: 'Harry Potter and the Chamber of Secrets'});
  expect(book.genre).toBe('Fantasy');
  expect(book.publishedYear).toBe(1998);
})