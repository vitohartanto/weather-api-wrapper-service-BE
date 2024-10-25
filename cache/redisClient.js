require('dotenv').config();
import { createClient } from 'redis';

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
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
