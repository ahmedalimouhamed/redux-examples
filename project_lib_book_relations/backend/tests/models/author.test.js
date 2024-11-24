import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Author from '../../models/Author.js';

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

afterEach(async() => {
  await Author.deleteMany();
});

test('Create an Author', async() => {
  const author = await Author.create({
    name: "J.K. Rowling",
    age: 55
  });
  expect(author.name).toBe("J.K. Rowling");
  expect(author.age).toBe(55);
});

test('find an Author', async() => {
  const author = await Author.create({
    name: "George R.R. Martin",
    age: 72
  });

  const found = await Author.findOne({
    name: "George R.R. Martin"
  });

  expect(found.name).toBe('George R.R. Martin');
  expect(found.age).toBe(72)
})