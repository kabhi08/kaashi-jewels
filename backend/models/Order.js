const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  customerName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },

  address: {
    fullAddress: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number }  // Store price at time of order
    }
  ],

  total: { type: Number, required: true },

  status: { type: String, default: 'Processing' }, // Options: 'Processing', 'Shipped', 'Delivered', etc.

  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },

  invoiceUrl: { type: String }, // optional - store generated PDF or Razorpay invoice link
}, {
  timestamps: true
});

module.exports = mongoose.model('order', orderSchema);
