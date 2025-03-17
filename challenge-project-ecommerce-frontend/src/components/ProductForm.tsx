import React, { useState } from 'react';
import { httpClient } from '../api/httpClient';

interface Props {
  onSuccess: () => void;
}

export function ProductForm({ onSuccess }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await httpClient.post('/products', { name, price, description });
      onSuccess();
      setName('');
      setPrice(0);
      setDescription('');
    } catch (err) {
      console.error('Error creating product:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Product</h3>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Description (optional):</label>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
