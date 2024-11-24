import request from 'supertest';
import {createServer} from 'http';
import express from 'express';
import mongoose from 'mongoose';
import {createHandler} from 'graphql-http/lib/use/express';
import schema from '../../graphql/schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Publisher from '../../models/Publisher';

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
  await Publisher.create({
    name: "penguin books",
    location: "london"
  });
});

test('fetch all publishers', async() => {
  const query = `
    query{
      publishers {
        id
        name
        location
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({query})
    .set('Content-Type', 'application/json');
  expect(response.status).toBe(200);
  expect(response.body.data.publishers).toBeInstanceOf(Array);
});

test('Add Publisher', async() => {
  const mutation = `
    mutation {
      addPublisher(name: "HarperCollins", location: "New York") {
        id
        name
        location
      }
    }
  `;

  const response = await request(server)
    .post('/graphql')
    .send({ query: mutation })
    .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.data.addPublisher.name).toBe("HarperCollins");
    expect(response.body.data.addPublisher.location).toBe("New York");  
});