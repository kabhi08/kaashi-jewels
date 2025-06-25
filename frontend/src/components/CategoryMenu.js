// src/components/CategoryMenu.js
import React, { useContext } from 'react';
import './CategoryMenu.css';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Necklace Set', path: '/collections/NecklaceSet' },
  { name: 'Earrings', path: '/collections/Earrings' },
  { name: 'Bangles', path: '/collections/Bangles' },
  { name: 'Rings', path: '/collections/Rings' },
  { name: 'Bracelet', path: '/collections/Bracelet' },
];

const CategoryMenu = ({ isMobile = false }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  return (
    <div className={`category-menu ${isDark ? 'dark-text' : 'light-text'} ${isMobile ? 'mobile-style' : ''}`}>
      {categories.map((item, idx) => (
        <span
          key={idx}
          className="category-item"
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default CategoryMenu;
