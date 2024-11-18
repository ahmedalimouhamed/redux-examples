import express from 'express';
import protect from '../middleware/authMiddleware';
import redis from '../config/redis';

const authRoutes = express.Router();

authRoutes.post('/logout', protect, async(req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const expiresIn = process.env.JWT_EXPIRE || 3600;

  await redis.setex(`blacklist:${token}`, expiresIn, 'blacklisted');
  res.status(200).json({message: 'Logged out successfully'});
});

export default authRoutes;