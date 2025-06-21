const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/order');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const router = express.Router();

// 🔐 Razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// 📞 Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 📦 Create order
router.post('/orders', async (req, res) => {
  const { amount, receipt } = req.body;
  try {
    const order = await instance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt,
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧾 Verify signature, store order, send email + SMS
router.post('/verify', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    cart,
    total,
    address,
    email,
    phone
  } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = hmac.digest('hex');

  if (digest !== razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Signature mismatch' });
  }

  try {
    const newOrder = new Order({
      userId,
      products: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      total,
      address,
      status: 'Confirmed',
    });

    await newOrder.save();

    // 📧 Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation - Kaashi Jewels',
      html: `
        <h3>Thank you for your order!</h3>
        <p>Order ID: <strong>${newOrder._id}</strong></p>
        <p>We will deliver to: <em>${address}</em></p>
      `,
    });

    // 📲 WhatsApp or SMS
    await twilioClient.messages.create({
      body: `🛍️ Kaashi Jewels: Thank you for your order! Order ID: ${newOrder._id}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}`,
    });

    res.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error('❌ Error saving order/email/SMS:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🔔 Razorpay Webhook
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature === expectedSignature) {
    console.log('✅ Webhook verified');
    // TODO: Update order status in DB if needed
    res.status(200).json({ success: true });
  } else {
    console.log('❌ Invalid webhook signature');
    res.status(400).send('Invalid signature');
  }
});

module.exports = router;
