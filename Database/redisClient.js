const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient();

// Handle connection errors
redisClient.on('error', (err) => console.error('Redis error:', err));

// Connect to Redis server
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
})();

module.exports = redisClient;
