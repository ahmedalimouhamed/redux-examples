import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { connectRedis, redisClient } from './config/redis.js';
import cors from 'cors';
import seedUsers from './seed/usersSeeders.js';
import User from './models/User.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const init = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    console.log('Connected to MongoDB');

    // Seed users into the database
    await seedUsers();

    // Connect to Redis
    await connectRedis();

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Error during initialization:', err);
    process.exit(1);
  }
};
init();

app.get('/api/users', async (req, res) => {
  try {
    // Check Redis cache
    const cachedUsers = await redisClient.get('users');
    if (cachedUsers) {
      console.log('Cache hit:', cachedUsers);
      return res.json(JSON.parse(cachedUsers));
    }

    // Fetch data from MongoDB if not cached
    const users = await User.find();
    await redisClient.setEx('users', 3600, JSON.stringify(users)); // Cache for 1 hour
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});
