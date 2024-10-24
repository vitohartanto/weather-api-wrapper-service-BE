const axios = reqire('axios');
const redisClient = require('../cache/redisClient');

const WEATHER_API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.WEATHER_API_KEY;

const getWeather = async (city) => {
  try {
    const cacheKey = `weather:${city}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

module.exports = { getWeather };
