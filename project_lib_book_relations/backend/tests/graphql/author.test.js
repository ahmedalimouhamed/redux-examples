import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { createServer } from 'http';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from '../../graphql/schema.js';
import Author from '../../models/Author.js';

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
  await Author.create({ name: 'John Doe', age: 45 });
});

test('fetch Authors', async () => {
  const query = `
    query {
      authors {
        id
        name
        age
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({ query })
    .set('Content-Type', 'application/json');

  console.log(response.body); // Debug response

  expect(response.status).toBe(200);
  expect(response.body.data.authors).toBeInstanceOf(Array);
  expect(response.body.data.authors[0].name).toBe('John Doe');
});

test('Add Authors', async () => {
  const mutation = `
    mutation {
      addAuthor(name: "Jane Doe", age: 30) {
        id
        name
        age
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({ query: mutation })
    .set('Content-Type', 'application/json');

  expect(response.status).toBe(200);
  expect(response.body.data.addAuthor.name).toBe('Jane Doe');
  expect(response.body.data.addAuthor.age).toBe(30);
});
