import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // 🔐 Simulate fetching user from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem('user')) || {
      name: 'Guest',
      email: 'guest@example.com'
    };
    setUser(storedUser);
  }, []);

  return (
    <div className="profile-page">
      <h2>👤 User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* You can add more user info, like address, phone, etc. */}
      </div>
    </div>
  );
};

export default ProfilePage;
