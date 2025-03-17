import { useEffect, useState } from 'react';
import { httpClient } from '../api/httpClient';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await httpClient.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    reload: fetchProducts,
  };
}
