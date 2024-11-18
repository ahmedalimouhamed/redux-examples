import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

let isConnected = false;

const connectRedis = async () => {
    if (!isConnected) {
        try {
            await redisClient.connect();
            isConnected = true;
            console.log('Connected to Redis');
        } catch (err) {
            console.error('Error connecting to Redis:', err);
        }
    }
};

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

export { redisClient, connectRedis };
