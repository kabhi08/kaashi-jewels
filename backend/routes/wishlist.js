const express = require('express');
const Wishlist = require('../models/Wishlist');
const router = express.Router();

// Add to wishlist
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

module.exports = router;
