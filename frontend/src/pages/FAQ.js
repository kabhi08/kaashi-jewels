import React from 'react';
import SEO from '../components/SEO';

const FAQ = () => (
  <div className="page-container">
    <SEO
      title="FAQ"
      description="Find answers to common questions about Kaashi Jewels, our products, and services."
      keywords="FAQ, Kaashi Jewels, Jewelry Questions, Customer Support"
      url="https://www.kaashijewels.com/faq"
    />
    <h2>Frequently Asked Questions</h2>
    <p><strong>Q: Do you offer customization?</strong></p>
    <p>A: Yes! We offer custom engraving and design services for special occasions.</p>

    <p><strong>Q: How do I track my order?</strong></p>
    <p>A: After placing an order, you’ll receive an email with a tracking link.</p>

    <p><strong>Q: Are all products hallmarked?</strong></p>
    <p>A: Yes, all gold and silver jewelry is BIS hallmarked for authenticity.</p>

    <p><strong>Q: Can I cancel or return an order?</strong></p>
    <p>A: Please review our Refund Policy for detailed cancellation and return options.</p>
  </div>
);

export default FAQ;
