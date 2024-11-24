import {createServer} from 'http';
import {createHandler} from 'graphql-http/lib/use/express';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import redisCache from './middleware/redisCache.js';
import schema from './graphql/schema.js';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import jwt from 'jsonwebtoken'
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async(req, res) => {
  console.log("username and password", req.body)
  const {username, password} = req.body;
  const admin = await Admin.findOne({username});
  console.log("Admin : ", admin)

  if(!admin || !(await admin.comparePassword(password))){
    return res.status(401).json({message: 'Invalid credentials'})
  }

  const token = jwt.sign({id: admin._id, username: admin.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
  console.log("generated token from server : ", token);
  res.json({token});
})

app.post('/logout', (req, res)=> {
  res.json({message: 'logged out successfully'})
})

app.use(redisCache);

app.all(
  '/graphql',
  authMiddleware,
  createHandler({schema})
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo DB Connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

createServer(app).listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/graphql`)
})