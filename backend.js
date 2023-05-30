const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Enable JSON parsing for incoming requests
app.use(express.json());

// Serve the frontend static files
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Read the exchange rates JSON file
const exchangeRatesPath = path.join(__dirname, 'exchangeRates.json');
let exchangeRates = {};

try {
  const exchangeRatesData = fs.readFileSync(exchangeRatesPath, 'utf8');
  exchangeRates = JSON.parse(exchangeRatesData);
} catch (error) {
  console.error('Failed to read exchangeRates.json:', error);
}

// Define route to get exchange rates
app.get('/api/exchangeRates', (req, res) => {
  res.json(exchangeRates);
});

// Serve the frontend app on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend service is running on http://localhost:${PORT}`);
});