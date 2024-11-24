import request from 'supertest';
import {createServer} from 'http';
import express from 'express';
import mongoose from 'mongoose';
import {createHandler} from 'graphql-http/lib/use/express';
import schema from '../../graphql/schema.js';
import Reader from '../../models/Reader.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

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
  await Reader.create({
    name: 'Bob',
    age: 30,
    borrowedBooks: []
  });
});

test('fetch All Readers and their borrowed books', async() => {
  const query = `
    query{
      readers{
        id
        name
        age
        borrowedBooks{
          title
          genre
        }
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({query})
    .set('Content-Type', 'application/json');

  expect(response.status).toBe(200);
  expect(response.body.data.readers).toBeInstanceOf(Array);
});

test('Add Reader', async() => {
  const mutation = `
    mutation {
      addReader(name: "Jhon Doe", age: 25) {
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
    expect(response.body.data.addReader.name).toBe("Jhon Doe");
    expect(response.body.data.addReader.age).toBe(25);  
});