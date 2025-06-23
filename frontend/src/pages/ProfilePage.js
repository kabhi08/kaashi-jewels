import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (err) {
        console.error('User fetch failed:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/orders/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (err) {
        console.error('Orders fetch failed:', err);
      }
    };

    fetchUserData();
    fetchOrders();
  }, [navigate]);

  if (!user) return <div className="profile-page">Loading...</div>;

  return (
    <div className={`profile-page ${isDark ? 'dark' : 'light'}`}>
      <h2>👤 Your Profile</h2>

      <div className="profile-section">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="edit-btn" onClick={() => alert('Edit functionality coming soon.')}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className="orders-section">
        <h4>🧾 Your Orders</h4>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                Order #{order._id} | ₹{order.total} | {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
