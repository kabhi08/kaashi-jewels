import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAdminData = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      const [u, o, p] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/users', { headers }),
        axios.get('http://localhost:5000/api/admin/orders', { headers }),
        axios.get('http://localhost:5000/api/admin/products', { headers }),
      ]);
      setUsers(u.data);
      setOrders(o.data);
      setProducts(p.data);
    };
    fetchAdminData();
  }, [token]);

  return (
    <div className="admin-dashboard">
      <h2>👑 Admin Dashboard</h2>

      <section>
        <h3>📦 Products ({products.length})</h3>
        <ul>
          {products.map(p => (
            <li key={p._id}>{p.name} - ₹{p.price}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>🧾 Orders ({orders.length})</h3>
        <ul>
          {orders.map(o => (
            <li key={o._id}>
              {o.customerName} - ₹{o.total} - {o.status}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>👤 Users ({users.length})</h3>
        <ul>
          {users.map(u => (
            <li key={u._id}>{u.name} ({u.email}) - {u.role}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
