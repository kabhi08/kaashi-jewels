import React, { useState, useEffect } from 'react';
import './PhotoSlider.css';

const images = [
  { src: '/images/jewel1.jpg', caption: 'Elegant Gold Necklace Set' },
  { src: '/images/jewel2.jpg', caption: 'Royal Diamond Earrings' },
  { src: '/images/jewel3.jpg', caption: 'Traditional Bridal Collection' }
];

const PhotoSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []); // ✅ Only runs once on mount — images is static

  const goPrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="photo-slider-container">
      <div className="photo-slider">
        {images.map((img, i) => (
          <div
            className={`slide ${i === index ? 'active' : ''}`}
            key={i}
          >
            <img src={img.src} alt={`jewel-${i}`} />
            <div className="caption">{img.caption}</div>
          </div>
        ))}

        <button className="arrow left" onClick={goPrev}>❮</button>
        <button className="arrow right" onClick={goNext}>❯</button>
      </div>
    </div>
  );
};

export default PhotoSlider;
