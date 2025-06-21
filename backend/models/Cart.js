
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
  quantity: Number
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
