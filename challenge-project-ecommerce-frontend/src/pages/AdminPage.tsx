import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProductForm } from '../components/ProductForm';
import { httpClient } from '../api/httpClient';
import CryptoJS from 'crypto-js';

export function AdminPage() {
  const { role, token } = useContext(AuthContext);
  const [products, setProducts] = useState<any[]>([]);

  const isAdmin = () => {
    const secret = import.meta.env.REACT_APP_ROLE_SECRET || 'some-random-secret-key';
    const hashedAdminRole = CryptoJS.HmacSHA256('ADMIN', secret).toString(CryptoJS.enc.Hex);
    return role === hashedAdminRole;
  };

  async function loadProducts() {
    if (!token) return;
    const res = await httpClient.get('/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  }

  useEffect(() => {
    loadProducts();
  }, [token]);

  if (!isAdmin()) {
    return <p>Access denied. Admin only.</p>;
  }

  async function handleDelete(id: string) {
    if (!token) return;
    await httpClient.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ProductForm onSuccess={loadProducts} />
      <h3>Existing Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
