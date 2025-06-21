// src/pages/Home.js
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './Home.css';
import PhotoSlider from '../components/PhotoSlider';
import CategoryMenu from '../components/CategoryMenu';

const videoData = [
  {
    videoSrc: '/videos/video1.mp4',
    title: 'Crafting Elegance',
    description:
      'Step into the world of timeless craftsmanship where every piece of jewelry begins as a vision and transforms into a masterpiece. Watch our skilled artisans carefully mold, shape, and polish each detail by hand — from intricate kundan work to the delicate setting of pearls and gemstones. Every movement reflects a legacy of tradition, patience, and precision.',
    align: 'left',
  },
  {
    videoSrc: '/videos/video2.mp4',
    title: 'Shine that Lasts',
    description:
      'Discover the unmatched quality and enduring beauty of Kaashi Jewels through our premium finishing process. Each piece undergoes multiple layers of meticulous polishing and protective coating to enhance shine, durability, and resistance to tarnish.',
    align: 'right',
  },
  {
    videoSrc: '/videos/video3.mp4',
    title: 'Inspiring Traditions',
    description:
      'Explore how tradition meets modern elegance in every masterpiece from Kaashi Jewels. Our designs blend age-old craftsmanship with contemporary styles, celebrating heritage while embracing innovation.',
    align: 'left',
  },
];

const collections = [
  { name: 'NecklaceSet', image: '/images/NecklaceSet.jpg', path: '/collections/NecklaceSet' },
  { name: 'Earrings', image: '/images/Earrings.jpg', path: '/collections/Earrings' },
  { name: 'Bangles', image: '/images/Bangles.png', path: '/collections/Bangles' },
  { name: 'Rings', image: '/images/Rings.png', path: '/collections/Rings' },
  { name: 'Bracelet', image: '/images/Bracelet.png', path: '/collections/Bracelet' },
];

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const scrollRef = useRef();
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };
  
  return (
    <div className={`home-container ${isDark ? 'dark-text' : 'light-text'}`}>

       <div className="category-menu-wrapper">
          <CategoryMenu />
        </div>

      <section className="intro-section">
        <h1>Welcome to Kaashi Jewels</h1>
        <p>Explore handcrafted elegance in every piece</p>
      </section>
      <PhotoSlider />

      <section className="collection-section">
        <h2 className="collection-heading">Discover Our Collections</h2>
        <div className="collection-controls">
          <button onClick={scrollLeft}>&lt;</button>
          <div className="collection-slider" ref={scrollRef}>
            {collections.map((item, index) => (
              <div
                className="collection-item"
                key={index}
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer' }}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <button onClick={scrollRight}>&gt;</button>
        </div>
      </section>

      <section className="video-section">
        {videoData.map((item, idx) => (
          <div key={idx} className={`video-row ${item.align === 'right' ? 'reverse' : ''}`}>
            <div className="video-wrapper">
              <video
                src={item.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
              />
            </div>
            <div className="video-description">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="customer-reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <button className="view-all-button">View All</button>
        </div>
        <div className="reviews-scroll-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <div className="review-card" key={num}>
              <p className="review-text">
                "Absolutely stunning jewelry! The quality exceeded my expectations. Fast delivery too!"
              </p>
              <div className="reviewer-name">— Priya Shah</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-left">
            <h3 className="footer-logo">Kaashi Jewels</h3>
            <p>Don’t miss any updates or promotions by signing up to our newsletter.</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button>&gt;</button>
            </div>
          </div>

          <div className="footer-middle">
            <div>
              <h4>Our Policies</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>Terms of Usage</li>
                <li>Shipping Policy</li>
              </ul>
            </div>
           <div className="footer-right">
    <h4>Useful Links</h4>
    <ul>
      <li>About Us</li>
      <li>FAQ</li>         {/* ✅ Inserted here */}
      <li>Contact Us</li>
      <li>Sitemap</li>
    </ul>
    <div className="social-icons">
      <i className="fab fa-facebook-f"></i>
      <i className="fab fa-instagram"></i>
      <i className="fab fa-youtube"></i>
    </div>
  </div>
</div>

          <div className="footer-right">
            <h4>Contact Details</h4>
            <p>📞 +91 9876543210</p>
            <p>📧 support@kaashijewels.com</p>
            <p>📍 3rd Floor, MG Road, Vadodara, Gujarat</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Kaashi Jewels | All rights reserved</p>
          <div className="app-links">
            <img src="/images/App Store.png" alt="App Store" />
            <img src="/images/Google Play.svg" alt="Google Play" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
