import Redis from 'ioredis';

const redis = new Redis();

const redisCache = async (req, res, next) => {
  try {
    const cacheKey = `graphql:${req.body?.query}`;

    // Check if data is cached
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // If cached data exists, return it
      res.setHeader('Content-Type', 'application/json'); // Ensure proper content type
      res.send(JSON.parse(cachedData));
      return; // Skip further middleware or handlers
    }

    // Override the send method to cache the response
    const originalSend = res.send;
    res.send = async (body) => {
      try {
        // Cache the response body
        await redis.set(cacheKey, body, 'EX', 3600); // Cache for 1 hour
      } catch (cacheError) {
        console.error('Redis cache error:', cacheError);
      }
      originalSend.call(res, body); // Send the original response
    };

    next(); // Proceed to the next middleware/handler
  } catch (err) {
    console.error('Redis middleware error:', err);
    next(); // Proceed if Redis fails
  }
};

export default redisCache;
