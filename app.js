const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userProfileRoutes = require('./src/routes/userProfileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userProfileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;
