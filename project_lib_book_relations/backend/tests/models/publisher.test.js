import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Publisher from '../../models/Publisher.js';

let mongoServer;

beforeAll(async() => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri)
});

afterAll(async() => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async() => {
  await Publisher.deleteMany();
});

test('create a publisher', async() => {
  const publisher = await Publisher.create({
    name: "penguin books",
    location: "london"
  });

  expect(publisher.name).toBe("penguin books");
  expect(publisher.location).toBe("london");
});


test('find a publisher by name', async() => {
  await Publisher.create({
    name: "HarperCollins",
    location: "New York"
  });
  const publisher = await Publisher.findOne({name: 'HarperCollins'});
  expect(publisher.location).toBe('New York');
});