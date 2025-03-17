import React from 'react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '10px', background: '#ddd', padding: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <main style={{ margin: '20px' }}>
        {children}
      </main>
    </div>
  );
}
