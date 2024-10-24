const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.connect();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
