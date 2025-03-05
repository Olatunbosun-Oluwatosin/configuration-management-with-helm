// src/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Sample API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    appName: 'Tosyeno Web App',
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

