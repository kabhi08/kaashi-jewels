const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ➕ Add New Product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📦 Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get Single Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔎 Get Products by Category (e.g., necklace, rings)
router.get('/category/:cat', async (req, res) => {
  try {
    const category = req.params.cat.toLowerCase();
    const products = await Product.find({ category });
    if (products.length === 0) return res.status(404).json({ message: 'No products in this category' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
