import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import schema from './graphql/schema.js';
import redisCache from './middleware/redisCache.js';

dotenv.config();
const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(redisCache); // Redis caching middleware

app.use('/graphql', (req, res, next) => {
  console.log('Incoming request:', req.body);
  next();
});

// GraphQL handler
app.all(
  '/graphql',
  createHandler({
    schema,
    context: async ({ req }) => {
      return {}; // Add context if needed
    },
  })
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
