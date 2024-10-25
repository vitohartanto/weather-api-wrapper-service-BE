require('dotenv').config();

const express = require('express');
const { getWeather } = require('./services/weatherService');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
  res.json({ msg: 'testing' });
});

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const weatherData = await getWeather(city);
    console.log(weatherData);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
