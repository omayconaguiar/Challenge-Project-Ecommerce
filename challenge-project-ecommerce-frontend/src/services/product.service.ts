import httpClient from '../api/httpClient';

export async function getAllProducts(token: string) {
  const resp = await httpClient.get('/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function createProduct(
  data: { name: string, price: number, description: string, quantity: number, color: string, size: string, notes: string },
  token: string
) {
  const resp = await httpClient.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function updateProduct(
  id: string,
  data: { name: string, price: number, description: string, quantity: number, color: string, size: string, notes: string },
  token: string
) {
  const resp = await httpClient.patch(`/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function deleteProduct(id: string, token: string) {
  await httpClient.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
