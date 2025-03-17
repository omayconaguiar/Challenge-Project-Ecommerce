import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

export default function HomePage() {
  const navigate = useNavigate();
  const { token, role, logout } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const encryptedRole = decoded.role;

        const secretKey = import.meta.env.VITE_ROLE_SECRET || 'some-random-secret-key';
        const expectedAdminHash = CryptoJS.HmacSHA256('ADMIN', secretKey).toString(CryptoJS.enc.Hex);

        setIsAdmin(encryptedRole === expectedAdminHash);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    }
  }, [token]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome to Polaris Web</h1>
      <p>This is the home page.</p>

      {!token ? (
        <>
          <Link to="/login">Go to Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/products">View Products</Link>
          {isAdmin && <Link to="/users">User Management</Link>}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
        </>
      )}
    </div>
  );
}
