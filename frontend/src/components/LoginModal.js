// src/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import '../firebase'; // Make sure firebase is initialized in firebase.js

const LoginModal = ({ show, onHide, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onHide();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/forgot-password', { email: resetEmail });
      setResetSent(true);
      setTimeout(() => {
        setShowReset(false);
        setResetSent(false);
      }, 3000);
    } catch (err) {
      setError('Unable to send reset link');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      onHide();
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Google login failed');
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      onHide();
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Facebook login failed');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
       <Modal.Title className="w-100 text-center fs-5">🔐 Login to Your Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {!showReset && (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between mb-3">
              <Button type="submit" variant="primary">Login</Button>
              <Button variant="link" className="p-0" onClick={() => setShowReset(true)}>
                Forgot Password?
              </Button>
            </div>
          </Form>
        )}

        {showReset && (
          <Form onSubmit={handleForgotSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter your email to reset password</Form.Label>
              <Form.Control
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="warning">Send Reset Link</Button>
            <Button variant="link" className="ms-2 p-0" onClick={() => setShowReset(false)}>
              Back to Login
            </Button>
            {resetSent && <Alert variant="success" className="mt-2">Reset link sent!</Alert>}
          </Form>
        )}

        {!showReset && (
          <>
            <hr />
            <div className="d-flex gap-2">
              <Button variant="danger" className="w-100" onClick={handleGoogleLogin}>
                <FaGoogle /> Google
              </Button>
              <Button variant="primary" className="w-100" onClick={handleFacebookLogin}>
                <FaFacebook /> Facebook
              </Button>
            </div>
            <div className="text-center mt-3">
              Don’t have an account?{' '}
              <Button variant="link" className="p-0" onClick={onSwitchToRegister}>
                Register here
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
