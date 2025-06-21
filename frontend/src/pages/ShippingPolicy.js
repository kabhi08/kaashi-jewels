import React from 'react';
import { Helmet } from 'react-helmet';

const ShippingPolicy = () => (
  <div className="page-container">
    <Helmet>
      <title>Shipping Policy - Kaashi Jewels</title>
      <meta name="description" content="Read our Shipping Policy to understand the terms and conditions for shipping at Kaashi Jewels." />
    </Helmet>
    <h2>Shipping Policy</h2>
    <p>
      We offer FREE shipping across India. Orders are dispatched within 2 business days and delivered within 5–7 days.
    </p>
    <p>
      All parcels are insured and require signature upon delivery. You’ll receive tracking information via SMS/email once dispatched.
    </p>
    <p>
      We currently do not offer international shipping. Stay tuned!
    </p>
  </div>
);

export default ShippingPolicy;
