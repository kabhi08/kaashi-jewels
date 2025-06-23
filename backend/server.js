// 👉 Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 👉 App Initialization
const app = express();

// 👉 Constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 👉 Middleware Setup (IMPORTANT ORDER)
app.use(cors());

// Razorpay webhook route must use raw body before `express.json()`
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(express.json()); // Now enable normal JSON parsing for all other routes

// 👉 MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// 👉 Import Routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const paymentRoutes = require('./routes/payment');

// 👉 Use Routes
app.use('/api/users', userRoutes);         // User routes
app.use('/api/product', productRoutes);   // Product routes
app.use('/api/orders', orderRoutes);       // Order routes
app.use('/api/cart', cartRoutes);          // Cart routes
app.use('/api/wishlist', wishlistRoutes);  // Wishlist routes
app.use('/api/payment', paymentRoutes);    // Payment + webhook handler

// 👉 Root Route
app.get('/', (req, res) => {
  res.send('🚀 Kaashi Jewels backend is running!');
});

// 👉 404 Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 👉 Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server is running at: http://localhost:${PORT}`);
});
