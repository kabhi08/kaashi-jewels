import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import BuyPage from './pages/BuyPage';
import ProfilePage from './pages/ProfilePage';

import AdminDashboard from './pages/AdminDashboard';

import NecklaceSet from './collection/NecklaceSet';
import Earrings from './collection/Earrings';
import Bangles from './collection/Bangles';
import Rings from './collection/Rings';
import Bracelet from './collection/Bracelet';
import ProductDetailPage from './pages/ProductDetailPage';

import ThemeProvider from './context/ThemeContext';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('🔐 User fetch failed:', err.message);
        setUser(null);
      }
    };

    fetchLoggedUser();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          {/* 🌌 Optional animated background */}
          <div className="animated-bg">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          <NavigationBar />

          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<BuyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            

              {/* ✅ Protected Admin Route */}
              <Route
                path="/admin"
                element={
                  user && user.role === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              {/* 🧿 Collection Routes */}
              <Route path="/collections/NecklaceSet" element={<NecklaceSet />} />
              <Route path="/collections/Earrings" element={<Earrings />} />
              <Route path="/collections/Bangles" element={<Bangles />} />
              <Route path="/collections/Rings" element={<Rings />} />
              <Route path="/collections/Bracelet" element={<Bracelet />} />

              {/* 🧭 404 fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
