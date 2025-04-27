// weather.js
const axios = require('axios');

// Your OpenWeatherMap API Key
const apiKey = '5eb83a7d0bfbf5c44112df0096089d77';

async function getWeather(city) {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric' // Optional: return temperatures in Celsius
      }
    });

    // Optionally you can return a cleaner object:
    return {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw new Error('OpenWeatherMap API error');
  }
}

module.exports = getWeather;
