// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Button } from 'react-bootstrap';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <Button variant={isDark ? 'light' : 'dark'} onClick={toggleTheme} className="mb-3">
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </Button>
  );
};

export default ThemeToggle;
