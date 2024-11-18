import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD || null,
});

redis.on('connect', () => console.log('Connected to redis'));
redis.on('error', (err) => console.error('redis error : ', err));

export default redis;