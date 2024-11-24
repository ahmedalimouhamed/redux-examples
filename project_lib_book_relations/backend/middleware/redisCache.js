import Redis from 'ioredis';

const redis = new Redis();

const redisCache = async (req, res, next) => {
  try {
    const cacheKey = req.body?.query || req.url; // Generate a cache key based on the query or URL

    const cachedResponse = await redis.get(cacheKey);

    if (cachedResponse) {
      console.log("Cached data:", cachedResponse);
      res.setHeader('Content-Type', 'application/json'); // Ensure proper content type for GraphQL responses
      return res.end(cachedResponse); // Use `res.end` for raw response
    }

    // Intercept the response to store it in cache
    const originalEnd = res.end.bind(res);

    res.end = (body) => {
      console.log('Data set to the cache:', body.toString());
      redis.set(cacheKey, body.toString(), 'EX', 3600); // Cache response for 3600 seconds
      originalEnd(body);
    };

    next(); // Proceed to the GraphQL handler
  } catch (err) {
    console.error('Redis cache middleware error:', err);
    next(err); // Pass errors to the next error-handling middleware
  }
};

export default redisCache;
