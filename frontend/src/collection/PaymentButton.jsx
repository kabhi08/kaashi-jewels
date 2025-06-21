import React from 'react';
import { useRazorpay } from "react-razorpay";
import axios from 'axios';

const PaymentButton = ({ amount, receipt }) => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = async () => {
    const order = await axios.post('/api/payment/orders', { amount, receipt });
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.data.amount,
      currency: "INR",
      order_id: order.data.id,
      handler: async (res) => {
        const verify = await axios.post('/api/payment/verify', res);
        if (verify.data.success) alert("Payment successful!");
      },
      prefill: { email: "", contact: "" },
      theme: { color: "#F37254" },
    };
    new Razorpay(options).open();
  };

  return (
    <button onClick={handlePayment} disabled={isLoading}>
      {isLoading ? "Loading..." : `Pay ₹${amount}`}
    </button>
  );
};

export default PaymentButton;
