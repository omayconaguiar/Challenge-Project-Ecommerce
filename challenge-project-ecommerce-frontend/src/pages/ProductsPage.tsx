import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service';

export default function ProductsPage() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Product and Cart Form Fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [notes, setNotes] = useState('');

  async function fetchProducts() {
    if (!token) {
      logout();
      navigate('/');
      return;
    }

    try {
      const data = await getAllProducts(token);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      logout();
      navigate('/');
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [token]);

  async function handleCreateOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          { name, price, description, quantity, color, size, notes },
          token
        );
        setEditingProduct(null);
      } else {
        await createProduct({ name, price, description, quantity, color, size, notes }, token);
      }

      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  function resetForm() {
    setName('');
    setPrice(0);
    setDescription('');
    setQuantity(1);
    setColor('');
    setSize('');
    setNotes('');
  }

  async function handleDelete(id: string) {
    if (!token) return;

    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  function handleEdit(product: any) {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);

    if (product.cartItems.length > 0) {
      setQuantity(product.cartItems[0].quantity);
      setColor(product.cartItems[0].color || '');
      setSize(product.cartItems[0].size || '');
      setNotes(product.cartItems[0].notes || '');
    }
  }

  return (
    <div>
      <h2>Products & Cart Management</h2>

      <button onClick={() => navigate(-1)}>⟵ Go Back</button>

      <form onSubmit={handleCreateOrUpdate} style={{ display: 'grid', gap: '10px', maxWidth: '500px' }}>
        <h3>{editingProduct ? 'Edit Product & Cart' : 'Create Product & Cart'}</h3>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Price ($)"
          type="text"
          value={`$${price}`}
          onChange={(e) => setPrice(+e.target.value.replace('$', ''))}
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h4>Cart Item Details</h4>

        <input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          required
        />

        <input
          placeholder="Color (optional)"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          placeholder="Size (optional)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">{editingProduct ? 'Update' : 'Create'}</button>
        {editingProduct && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>Product List</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> - ${p.price} <br />
            {p.description} <br />
            <strong>Cart Info:</strong>
            {p.cartItems?.length > 0 ? (
              <ul>
                {p.cartItems.map((item: { quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; color: any; size: any; notes: any; }, index: React.Key | null | undefined) => (
                  <li key={index}>
                    <strong>Qty:</strong> {item.quantity}, 
                    <strong> Color:</strong> {item.color || 'N/A'}, 
                    <strong> Size:</strong> {item.size || 'N/A'}, 
                    <strong> Notes:</strong> {item.notes || 'N/A'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cart details available.</p>
            )}
            <button onClick={() => handleEdit(p)}>✏️ Edit</button>
            <button onClick={() => handleDelete(p.id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}
