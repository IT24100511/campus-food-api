const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import route modules
const studentRoutes = require('./routes/students');
const menuItemRoutes = require('./routes/menuItems');
const orderRoutes = require('./routes/orders');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Campus Food Ordering API is running' });
});

// Attach routes
app.use('/students', studentRoutes);
app.use('/menu-items', menuItemRoutes);
app.use('/orders', orderRoutes);
app.use('/analytics', analyticsRoutes);

// Database connection and server start
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });