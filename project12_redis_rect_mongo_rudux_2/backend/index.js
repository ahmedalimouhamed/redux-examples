import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import connectDb from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

