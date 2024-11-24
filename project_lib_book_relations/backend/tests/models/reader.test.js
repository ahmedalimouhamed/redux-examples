import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Reader from '../../models/Reader.js';

let mongoServer;

beforeAll(async() => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async() => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('create a Reader', async() => {
  const reader = await Reader.create({
    name: 'Alice', 
    age: 25, 
    borrowedBooks: []
  });
  expect(reader.name).toBe('Alice');
  expect(reader.age).toBe(25);
});

test('Add a book to reader\'s borrowed List', async() => {
  const reader = await Reader.create({
    name: 'Bob',
    age: 30,
    borrowedBooks: []
  });
  reader.borrowedBooks.push(new mongoose.Types.ObjectId());
  await reader.save();
  expect(reader.borrowedBooks.length).toBe(1)
});