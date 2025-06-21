// src/pages/Cart.js
import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const userId = 'user123'; // In real app, use auth context or token

  // Load cart from localStorage and backend
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(localCart);

    // Optional: Load from backend
    const fetchCartFromBackend = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setCartItems(data);
          localStorage.setItem('cart', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching cart from backend:', error);
      }
    };

    fetchCartFromBackend();
  }, []);

  // Save cart to backend and localStorage
  const updateCartStorage = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Save to backend
    fetch('http://localhost:5000/api/cart/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items: updatedItems })
    }).catch(err => console.error('Error saving cart to backend:', err));
  };

  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    updateCartStorage(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCartStorage(updated);
    }
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    updateCartStorage(updated);
  };

  const emptyCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    fetch(`http://localhost:5000/api/cart/clear/${userId}`, {
      method: 'DELETE'
    }).catch(err => console.error('Error clearing cart on backend:', err));
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <Container className={`py-4 ${isDark ? 'text-light' : 'text-dark'}`}>
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Button as={Link} to="/" variant="primary">
            ⬅️ Back to Home
          </Button>
        </>
      ) : (
        <>
          <Table striped bordered hover responsive variant={isDark ? 'dark' : 'light'}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th style={{ minWidth: '120px' }}>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt={item.name} width="50" className="me-2" />
                    {item.name}
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button variant="outline-secondary" size="sm" onClick={() => decreaseQty(index)}>-</Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => increaseQty(index)}>+</Button>
                    </div>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeItem(index)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ₹{getTotal()}</h4>
            <div>
              <Button variant="outline-danger" className="me-2" onClick={emptyCart}>
                🗑️ Empty Cart
              </Button>
              <Button variant="success" onClick={() => navigate('/checkout')}>
                ✅ Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
