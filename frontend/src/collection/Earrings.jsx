import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaFilter } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import './Necklaceset.css';

const Earrings = () => {
  const [earrings, setEarrings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const filterRef = useRef(null);
  const navigate = useNavigate();

  // 👉 Fetch earring products
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/category/earrings')
      .then(res => {
        setEarrings(res.data);
        setFiltered(res.data);
      })
      .catch(err => {
        console.error('❌ Error fetching earring products:', err);
      });
  }, []);

  // 👉 Handle price filter
  const handleFilterChange = (value) => {
    setShowFilter(false);
    switch (value) {
      case 'under1000':
        setFiltered(earrings.filter(p => p.price < 1000));
        break;
      case '1000to5000':
        setFiltered(earrings.filter(p => p.price >= 1000 && p.price <= 5000));
        break;
      case 'above5000':
        setFiltered(earrings.filter(p => p.price > 5000));
        break;
      default:
        setFiltered(earrings);
    }
  };

  // 👉 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`product-grid ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <div className="necklace-header">

        {/* ⬅️ Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoArrowBack size={20} />
        </button>

        {/* 💎 Title */}
        <div className="text-left center-text">
          <h2>Earring Collection</h2>
          <p>Explore our exquisite collection of earrings that add elegance to any outfit.</p>
        </div>

        {/* 🔍 Filter Icon + Dropdown */}
        <div className="filter-container" ref={filterRef}>
          <FaFilter
            className="filter-icon"
            onClick={() => setShowFilter(prev => !prev)}
            title="Filter by Price"
          />
          {showFilter && (
            <div className="filter-dropdown">
              <div onClick={() => handleFilterChange('all')}>All Prices</div>
              <div onClick={() => handleFilterChange('under1000')}>Under ₹1000</div>
              <div onClick={() => handleFilterChange('1000to5000')}>₹1000 - ₹5000</div>
              <div onClick={() => handleFilterChange('above5000')}>Above ₹5000</div>
            </div>
          )}
        </div>
      </div>

      {/* 🛍️ Product List */}
      <div className="product-list">
        {filtered.length === 0 ? (
          <p className="no-product-text">No products found.</p>
        ) : (
          filtered.map(product => (
           <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={`/images/${product.imageUrl}`}
                  alt={product.name || 'Jewelry'}
                  onError={(e) => { e.target.src = '/placeholder.png'; }}
                />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </Link>
            </div>    
          ))
        )}
      </div>
    </div>
  );
};

export default Earrings;
