const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.connect();

redisClient.on('connect', () => {
  console.log('Connected to our redis instance!');
  redisClient.set('Greatest Basketball Player', 'Lebron James');
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
