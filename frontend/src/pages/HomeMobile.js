// src/pages/HomeMobile.js
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './HomeMobile.css';
import PhotoSlider from '../components/PhotoSlider';
import CategoryMenu from '../components/CategoryMenu';

const HomeMobile = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const scrollRef = useRef();
  const navigate = useNavigate();

  const collections = [
    { name: 'Necklace Set', image: '/images/NecklaceSet.jpg', path: '/collections/NecklaceSet' },
    { name: 'Earrings', image: '/images/Earrings.jpg', path: '/collections/Earrings' },
    { name: 'Bangles', image: '/images/Bangles.png', path: '/collections/Bangles' },
    { name: 'Rings', image: '/images/Rings.png', path: '/collections/Rings' },
    { name: 'Bracelet', image: '/images/Bracelet.png', path: '/collections/Bracelet' },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className={`home-mobile-container ${isDark ? 'dark-text' : 'light-text'}`}>
      {/* Category Menu */}
      <CategoryMenu isMobile={true} />

      {/* Intro */}
      <section className="intro-mobile">
        <h2>Welcome to Kaashi Jewels</h2>
        <p>Handcrafted elegance in every piece</p>
      </section>

      {/* Slider */}
      <PhotoSlider />

      {/* Collection Slider */}
      <section className="collection-mobile">
        <h3>Our Collections</h3>
        <div className="scroll-controls">
          <button onClick={scrollLeft}>❮</button>
          <div className="scroll-list" ref={scrollRef}>
            {collections.map((item, i) => (
              <div className="collection-item" key={i} onClick={() => navigate(item.path)}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <button onClick={scrollRight}>❯</button>
        </div>
      </section>

      {/* Footer */}
      <section className="footer-mobile">
        <p>© 2025 Kaashi Jewels</p>
        <p>📧 support@kaashijewels.com</p>
      </section>
    </div>
  );
};

export default HomeMobile;
