import Redis from 'ioredis-mock';

const redis = new Redis();

redis.on('error', err => console.error('Redis Mock Error: ', err));
redis.on('connect', () => console.log('Mock redis connected'));

export default redis;
