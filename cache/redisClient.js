require('dotenv').config();
import { createClient } from 'redis';

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: 'redis-12767.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com',
    port: 12767,
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to our Redis instance!');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
})();

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

module.exports = redisClient;
