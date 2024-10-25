const redis = require('redis');

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('Connected to our redis instance!');
  redisClient.set('basketball', 'Lebron James');
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
