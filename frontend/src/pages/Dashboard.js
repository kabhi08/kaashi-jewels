// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '../App.css'; // Your animation styles

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect immediately to home page on mount
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Redirect to homepage after login
    } else {
      navigate('/login'); // If no token, go to login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Optional background effect */}
      <div className="animated-bg" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />

      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Container className="animate__animated animate__fadeIn">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="dashboard-box text-white text-center p-5 shadow-lg rounded">
                <h1 className="mb-3">Welcome Back!</h1>
                <p className="lead mb-4">
                  Redirecting you to Kaashi Jewels homepage...
                </p>
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
