const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const User = require('../models/user');
const Product = require('../models/Product');
const Order = require('../models/order');

// Get all users
router.get('/users', auth, adminOnly, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get all orders
router.get('/orders', auth, adminOnly, async (req, res) => {
  const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
  res.json(orders);
});

// Get all products
router.get('/products', auth, adminOnly, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
