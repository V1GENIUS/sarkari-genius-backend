// // config/redis.js
// const redis = require('redis');
// const client = redis.createClient({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
// });

// client.on('error', (err) => {
//   console.error('Redis connection error:', err);
// });

// client.on('connect', () => {
//   console.log('Connected to Redis');
// });

// client.connect();

// module.exports = client;
