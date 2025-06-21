const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST create order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
