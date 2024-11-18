import express from 'express';
import User from '../models/User.js';
import redis from '../config/redis.js'

const userRoutes = express.Router();
userRoutes.get('/', async(req, res) => {
  try{
    const cachedUsers = await redis.get('users');
    if(cachedUsers){
      console.log('Returning users from redis cache');
      return res.json(JSON.parse(cachedUsers))
    }
    const users = await User.find();
    await redis.setex('users', 60, JSON.stringify(users));
    res.json(users);
  }catch(err){
    res.status(500).json({message: 'Server error', err});
  }
});

userRoutes.get('/statistics', async(req, res) => {
  try{

    const cachedStats = await redis.get('userStatistics');
    if(cachedStats){
      console.log('Returning statistice from redis cache');
      return res.json(JSON.parse(cachedStats));
    }

    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: {$sum: 1},
          avgAge: {$avg: '$age'}
        }
      }
    ]);

    console.log('calculating statistics from mongodb');
    await redis.setex('userStatistics', 60, JSON.stringify(stats));

    res.json(stats)
  }catch(err){
    res.status(500).json({message: 'Server error ', err});
  }
});

export default userRoutes;