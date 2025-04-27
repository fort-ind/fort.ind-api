// server.js
const express = require('express');
const searchService = require('./search'); // Assuming search.js is exporting the search function
const weatherService = require('./weather'); // Assuming weather.js is exporting the weather function
const retrieveService = require('./retrieve'); // Assuming retrieve.js is exporting the retrieve function
const path = require('path');
const loadOrCreateApiKey = require('./getapikey'); // Assuming this is your API key handler

const app = express();
const port = 3000;

// Load server API key
const serverApiKey = loadOrCreateApiKey(); // Auto handle key

// Set view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Home page (landing page)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to My API Server</h1><p>Use /search, /weather, /retrieve</p>');
});

// Search page
app.get('/search', async (req, res) => {
  const query = req.query.query || ''; // Ensure query is always a string
  if (!query) {
    return res.render('search', { results: null, query: query }); // Pass empty query
  }
  try {
    const results = await searchService(query); // Call searchService with query
    res.render('search', { results, query }); // Pass both results and query to view
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Error fetching search results.');
  }
});

// Weather page
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.render('weather', { weather: null });
  }
  try {
    const weather = await weatherService(city);
    res.render('weather', { weather });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data.');
  }
});

// Retrieve page
app.get('/retrieve', async (req, res) => {
  const fileUrl = req.query.url;
  if (!fileUrl) {
    return res.render('retrieve', { content: null });
  }
  try {
    const content = await retrieveService(fileUrl);
    res.render('retrieve', { content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving file.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
