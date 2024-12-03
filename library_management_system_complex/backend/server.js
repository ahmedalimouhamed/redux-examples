import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolvers } from './resolvers.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Add mongoose debug mode
mongoose.set('debug', true);

// Read schema
const typeDefs = readFileSync(join(__dirname, 'schemas', 'newschema.graphql'), 'utf-8');

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// GraphQL endpoint
app.use('/graphql', createHandler({ 
  schema,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  }
}));

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});
