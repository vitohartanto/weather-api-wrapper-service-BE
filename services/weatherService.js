const axios = require('axios');
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

    console.log('Cache miss');
    const response = await axios.get(`${WEATHER_API_URL}/${city}/next24hours`, {
      params: {
        unitGroup: 'metric',
        include: 'current,days,hours,alerts',
        key: API_KEY,
        contentType: 'json',
      },
    });

    const data = response.data;

    // Menyimpan data yang diinginkan saja
    const result = {
      resolvedAddress: data.resolvedAddress,
      temp: data.days[0].temp,
      conditions: data.days[0].conditions,
      windspeed: data.days[0].windspeed,
      humidity: data.days[0].humidity,
      icon: data.days[0].icon,
      hours: filterNext24Hours(data.days[0].hours),
    };

    // Simpan data di Redis dengan expiry time (misalnya, 12 jam = 43200 detik)
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Fungsi untuk menyaring data 24 jam ke depan
function filterNext24Hours(hours) {
  const now = new Date();
  const next24Hours = now.getTime() + 24 * 60 * 60 * 1000;

  // Filter data jam yang berada dalam rentang waktu 24 jam ke depan
  return hours.filter((hour) => {
    const hourTime = new Date(hour.datetimeEpoch * 1000).getTime();
    return hourTime >= now.getTime() && hourTime <= next24Hours;
  });
}

module.exports = { getWeather };
