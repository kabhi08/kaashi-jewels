import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './RegisterModal.css'; // Ensure you have a CSS file for styling
const RegisterModal = ({ show, onHide, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password
      });

      localStorage.setItem('token', data.token);
      onHide();
      window.location.href = '/profile'; // or use navigate('/profile') if using React Router hook
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">📝 Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Register
          </Button>

          <div className="text-center mt-3">
            Already have an account?{' '}
            <Button variant="link" className="p-0" onClick={onSwitchToLogin}>
              Login
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
