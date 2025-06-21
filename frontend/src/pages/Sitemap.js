import React from 'react';
import SEO from '../components/SEO';

const Sitemap = () => (
  <div className="page-container">
    <SEO
      title="Sitemap"
      description="Explore the sitemap of Kaashi Jewels to find your way around our website."
      keywords="Sitemap, Kaashi Jewels, Website Navigation"
      url="https://www.kaashijewels.com/sitemap"
    />
    <h2>Website Sitemap</h2>
    <ul>
      <li>🏠 Home</li>
      <li>🛍️ Products</li>
      <li>❤️ Wishlist</li>
      <li>🛒 Cart</li>
      <li>🧾 Orders</li>
      <li>📄 Privacy Policy</li>
      <li>📄 Terms of Usage</li>
      <li>📄 Refund Policy</li>
      <li>📄 Shipping Policy</li>
      <li>📞 Contact Us</li>
    </ul>
  </div>
);

export default Sitemap;
