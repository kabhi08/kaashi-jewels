import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import BuyPage from './pages/BuyPage';
import ProfilePage from './pages/ProfilePage';
import HomeMobile from './pages/HomeMobile';

// ✨ Jewelry Collection Pages
import NecklaceSet from './collection/NecklaceSet';
import Earrings from './collection/Earrings';
import Bangles from './collection/Bangles';
import Rings from './collection/Rings';
import Bracelet from './collection/Bracelet';
import ProductDetailPage from './pages/ProductDetailPage';
import ThemeProvider from './context/ThemeContext';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          {/* 🌌 Optional animated background */}
          <div className="animated-bg">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          {/* 🧭 Navbar and category menu */}
          <NavigationBar />
          

          {/* 🧭 Routing */}
          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<BuyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mobile-home" element={<HomeMobile />} />
              {/* 🔗 Collection Routes */}
             <Route path="/collections/NecklaceSet" element={<NecklaceSet />} />
             <Route path="/collections/Earrings" element={<Earrings />} />
             <Route path="/collections/Bangles" element={<Bangles />} />
             <Route path="/collections/Rings" element={<Rings />} />
             <Route path="/collections/Bracelet" element={<Bracelet />} />

              {/* 🏠 Default route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
