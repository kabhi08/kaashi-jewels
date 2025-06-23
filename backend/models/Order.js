// /backend/models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  customerName: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },

  address: {
    fullAddress: { type: String, required: true },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' }
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, default: 0 }
    }
  ],

  total: { type: Number, required: true },

  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },

  razorpay_order_id: { type: String, default: '' },
  razorpay_payment_id: { type: String, default: '' },
  razorpay_signature: { type: String, default: '' },

  invoiceUrl: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
