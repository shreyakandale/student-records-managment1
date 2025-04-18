const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/students', studentRoutes); // Student Routes (Protected)

// Export the app to use in the server.js
module.exports = app;
