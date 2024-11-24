import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { createServer } from 'http';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from '../../graphql/schema.js';
import Author from '../../models/Author.js';
import Publisher from '../../models/Publisher.js';
import Book from '../../models/Book.js';

let server, mongoServer;

const app = express();
app.use('/graphql', createHandler({ schema }));

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  server = createServer(app);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

beforeEach(async () => {
  const author = await Author.create({
    name: "J.K. Rowling",
    age: 55
  });

  const publisher = await Publisher.create({
    name: 'Bloomsbury',
    location: 'London'
  });

  await Book.create({
    title: 'Harry Potter and Philosopher\'s Stone',
    genre: 'Fantasy',
    publishedYear: 1997,
    author: author._id,
    publisher: publisher._id
  });
});

test('Fetch all books', async() => {
  const query = `
    query{
      books{
        id
        title
        genre
        publishedYear
        author{
          name
          age
        }
        publisher{
          name
          location
        }
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({query})
    .set('Content-Type', 'application/json');

  expect(response.status).toBe(200);
  expect(response.body.data.books).toBeInstanceOf(Array);

});

test('Add a Book', async() => {
  const author = await Author.findOne({ name: "J.K. Rowling" });
  const publisher = await Publisher.findOne({ name: "Bloomsbury" });

  const authorId = author?._id; // Use optional chaining to handle null
  const publisherId = publisher?._id;
  console.log(authorId, publisherId);
  const mutation = `
    mutation{
      addBook(
        title: "Harry Potter and the Chamber of Secrets",
        genre: "Fantasy",
        publishedYear: 1998,
        author: "${authorId}",
        publisher: "${publisherId}"
      ){
        id
        title
        genre
        publishedYear
        author{
          name
          age
        }
        publisher{
          name
          location
        }
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({query: mutation})
    .set('Content-Type', 'application/json');

  expect(response.status).toBe(200);
  expect(response.body.data.addBook.title).toBe('Harry Potter and the Chamber of Secrets')
  expect(response.body.data.addBook.genre).toBe('Fantasy')
})