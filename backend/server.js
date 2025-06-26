// 👉 Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// 👉 App Initialization
const app = express();

// 👉 Constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 👉 Middleware Setup (IMPORTANT ORDER)
app.use(cors());

// Webhook route must use raw body for Razorpay
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// Enable normal JSON parsing for all other routes
app.use(express.json());

// 👉 MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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
const adminRoutes = require('./routes/admin');
// 👉 Use Routes
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', require('./routes/users'));
// 👉 Production Mode: Serve static files (optional for deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

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
