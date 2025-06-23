import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  Badge
} from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; // Import your custom styles for the navbar

const NavigationBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleAuthRequired = () => setShowLoginModal(true);

  return (
    <>
      <Navbar
        expand="lg"
        className={`px-3 py-2 shadow-sm ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}
        sticky="top"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: isDark ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 0.8)',
          borderBottom: isDark ? '1px solid #333' : '1px solid #ccc',
          color: isDark ? '#fff' : '#000'
        }}
      >
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold d-flex align-items-center"
            style={{ fontSize: '1.4rem', color: isDark ? '#fff' : '#000' }}
          >
            <img
              src="/logo192.png"
              alt="Kaashi Jewels"
              height="40"
              width={25}
              className="d-inline-block align-top me-2"
            />
            Kaashi Jewels
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            {/* Search Bar */}
            <Form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="What are you looking for?"
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  backgroundColor: isDark ? '#222' : '#fff',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#444' : '#ccc'
                }}
              />
              <Button variant={isDark ? 'outline-light' : 'outline-dark'} type="submit">
                Search
              </Button>
            </Form>

            {/* Icons & Actions */}
            <Nav className="ms-auto align-items-center gap-3">
              {/* Theme Toggle */}
              <Button
                variant={isDark ? 'outline-light' : 'outline-dark'}
                onClick={toggleTheme}
                size="sm"
              >
                {isDark ? '☀️ ' : '🌙 '}
              </Button>

              {/* Wishlist */}
              <Nav.Link
                as="button"
                onClick={() => token ? navigate('/wishlist') : handleAuthRequired()}
                className={`btn btn-link ${isDark ? 'text-light' : 'text-dark'} p-0 border-0`}
              >
                <FaHeart className="me-1" />
              </Nav.Link>

              {/* Cart */}
              <Nav.Link
                as="button"
                onClick={() => token ? navigate('/cart') : handleAuthRequired()}
                className={`btn btn-link position-relative ${isDark ? 'text-light' : 'text-dark'} p-0 border-0`}
              >
                <FaShoppingCart size={18} />
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* Auth Buttons */}
              {token ? (
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <LoginModal
                   show={showLoginModal}
                   onHide={() => setShowLoginModal(false)}
                   onSwitchToRegister={() => {
                   setShowLoginModal(false);
                   setTimeout(() => setShowRegisterModal(true), 300); // 🔧 Fix
                    }}
                    />

                   <RegisterModal
                   show={showRegisterModal}
                   onHide={() => setShowRegisterModal(false)}
                   onSwitchToLogin={() => {
                   setShowRegisterModal(false);
                   setTimeout(() => setShowLoginModal(true), 300); // 🔧 Fix
               }}
              />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal
  show={showLoginModal}
  onHide={() => setShowLoginModal(false)}
  onSwitchToRegister={() => {
    setShowLoginModal(false);
    setTimeout(() => setShowRegisterModal(true), 350); // Ensure timing is after animation ends
  }}
/>

     <RegisterModal
  show={showRegisterModal}
  onHide={() => setShowRegisterModal(false)}
  onSwitchToLogin={() => {
    setShowRegisterModal(false);
    setTimeout(() => setShowLoginModal(true), 350);
  }}
/>
<div className="navbar-right">
  <Link to="/profile" className="profile-icon">
    <FaUserCircle size={24} title="Profile" />
  </Link>
</div>
    </>
  );
};

export default NavigationBar;
