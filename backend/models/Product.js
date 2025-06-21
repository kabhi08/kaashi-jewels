const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: {
    type: String,
    required: true,
    enum: ['necklace', 'rings', 'bracelet', 'earrings', 'bangles'], // restrict categories
  },
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('product', productSchema);
