import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '../App.css'; // For fade-in effect

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Advanced animated background */}
      <div className="animated-bg" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />

      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Container className="animate__animated animate__fadeIn">
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="dashboard-box text-white text-center p-5 shadow-lg rounded">
                <h1 className="mb-3">Welcome to Your Dashboard</h1>
                <p className="lead mb-4">
                  You have successfully accessed a protected route.
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
