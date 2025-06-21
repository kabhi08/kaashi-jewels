import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './Wishlist.css'; // Optional, you can skip or style inside JS


const Wishlist = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // Dummy data for now – replace with backend/localStorage later
  const wishlistItems = [
    {
      id: 1,
      name: 'Elegant Gold Necklace',
      price: '₹3,200',
      image: '/images/NecklaceSet.jpg',
    },
    {
      id: 2,
      name: 'Traditional Bangles',
      price: '₹1,500',
      image: '/images/Bangles.png',
    },
  ];

  return (
    <div
      className={`wishlist-page ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      style={{ minHeight: '100vh', padding: '2rem' }}
    >
     <h2
  className="mb-4"
  style={{ color: isDark ? '#fff' : '#000' }}
>
   Your Wishlist
</h2>

      {wishlistItems.length > 0 ? (
        <div className="d-flex flex-wrap gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="wishlist-card shadow"
              style={{
                width: '220px',
                background: isDark ? '#1e1e1e' : '#fff',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <h5 className="mt-3" style={{ color: isDark ? '#fff' : '#000' }}>
  {item.name}
</h5>
<p style={{ color: isDark ? '#ccc' : '#555' }}>
  {item.price}
</p>

              <button className="btn btn-sm btn-danger">Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: isDark ? '#ccc' : '#555' }}>
  Your wishlist is currently empty.
</p>
      )}

      <div className="mt-5">
        <Link to="/" className="btn btn-outline-primary">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
