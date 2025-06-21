import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import './BuyPage.css';
  
const BuyPage = ({ cart, total, userId }) => {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { isDark } = useContext(ThemeContext);
  
  const handlePayment = async () => {
    if (!address || !email || !phone) {
      return alert('Please fill all address and contact details');
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);

    script.onload = async () => {
      try {
        const { data } = await axios.post('http://localhost:5000/api/payment/orders', {
          amount: total,
          receipt: 'receipt_' + new Date().getTime()
        });

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: 'Kaashi Jewels',
          description: 'Order Payment',
          prefill: {
            name: "Customer",
            email,
            contact: phone
          },
          method: {
            netbanking: true,
            card: true,
            upi: true,
            wallet: true,
            emi: false,
            paylater: false
          },
          theme: { color: '#f57224' },
          handler: async function (response) {
            try {
              const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', {
                ...response,
                cart,
                total,
                userId,
                address,
                email,
                phone
              });

              if (verifyRes.data.success) {
                alert('✅ Payment successful! Order placed.');
                window.location.href = '/orders';
              } else {
                alert('❌ Verification failed.');
              }
            } catch (err) {
              alert('❌ Server Error');
              console.error(err);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error('Payment error:', err);
        alert('Payment failed. Try again.');
      }
    };
  };

  return (
    <div className={`buy-page ${isDark ? 'dark' : 'light'}`}>
      <div className="buy-container">
        <h2>🛒 Confirm Your Order</h2>
        <p><strong>Total Amount:</strong> ₹{total}</p>

        <form className="buy-form">
          <label>📍 Address</label>
          <textarea
            rows="3"
            placeholder="Flat, Street, City, Pincode"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>📧 Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>📞 Phone</label>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="button" onClick={handlePayment} className="buy-btn">
            💳 Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyPage;
