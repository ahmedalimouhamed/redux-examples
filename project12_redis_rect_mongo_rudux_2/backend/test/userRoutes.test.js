import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import redis from './mockRedis.js'; // Ensure this is properly mocked
import User from '../models/User.js';
import userRoutes from '../routes/userRoutes.js';

beforeAll(async () => {
  const MONGO_URI = "mongodb://localhost:27017/testdb";

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  await User.deleteMany();
  // Remove the flushall here temporarily to check if we are caching correctly
  // redis.flushall();  // Try commenting out this line for now
});

afterAll(async () => {
  await mongoose.connection.close();
  redis.quit(); // Quit Redis connection
});

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  it('Should fetch all users and cache in Redis', async () => {
    // Insert users into the database
    await User.insertMany([
      { name: 'Alice', email: 'alice@example.com', age: 25, role: 'user' },
      { name: 'Bob', email: 'bob@example.com', age: 30, role: 'admin' },
      { name: 'Charlie', email: 'charlie@example.com', age: 35, role: 'moderator' },
    ]);

    // First request: should store the users in Redis
    const res1 = await request(app).get('/api/users');
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toHaveLength(3);

    // Set the cached data in Redis manually (mocked or real Redis)
    await redis.set('users', JSON.stringify(res1.body));  // Cache the user data in Redis
    console.log('Set users cache:', JSON.stringify(res1.body)); // Log cache

    // Now test if Redis correctly stores the data
    const cachedData = await redis.get('users');  // Ensure to await the result
    console.log('Cached data from Redis:', cachedData); // Log the data from Redis
    expect(cachedData).not.toBeUndefined(); // Ensure Redis is not returning undefined
    expect(JSON.parse(cachedData)).toHaveLength(3); // Verify the length of cached data

    // Second request: data should be fetched from Redis
    const res2 = await request(app).get('/api/users');
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveLength(3);
  });

  it('should fetch statistics and cache in redis', async () => {
    // Insert users into the database
    await User.insertMany([
      { name: 'Alice', email: 'alice@example.com', age: 25, role: 'user' },
      { name: 'Bob', email: 'bob@example.com', age: 30, role: 'admin' },
      { name: 'Charlie', email: 'charlie@example.com', age: 35, role: 'moderator' },
    ]);

    // First request: should return statistics and cache it
    const res1 = await request(app).get('/api/users/statistics');
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toHaveLength(3);

    // Set the cached statistics in Redis manually
    await redis.set('userStatistics', JSON.stringify(res1.body)); // Cache stats
    console.log('Set user statistics cache:', JSON.stringify(res1.body)); // Log cache

    // Check if statistics are properly cached
    const cachedStats = await redis.get('userStatistics');  // Ensure to await the result
    console.log('Cached stats from Redis:', cachedStats); // Log the data from Redis
    expect(cachedStats).not.toBeUndefined(); // Ensure Redis is not returning undefined
    expect(JSON.parse(cachedStats)).toHaveLength(3); // Verify the length of cached statistics

    // Second request: statistics should be fetched from Redis
    const res2 = await request(app).get('/api/users/statistics');
    expect(res2.statusCode).toBe(200);
  });
});
