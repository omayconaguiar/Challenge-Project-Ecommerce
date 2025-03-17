import httpClient from '../api/httpClient';

export async function createCartItem(
  data: { productId: string; quantity: number; color?: string; size?: string; notes?: string },
  token: string
) {
  const resp = await httpClient.post('/cart/items', data, {
    headers: { Authorization: token },
  });
  return resp.data;
}

export async function updateCartItem(
  productId: string,
  data: { quantity?: number; color?: string; size?: string; notes?: string },
  token: string
) {
  const resp = await httpClient.patch(`/cart/items/${productId}`, data, {
    headers: { Authorization: token },
  });
  return resp.data;
}

export async function deleteCartItem(productId: string, token: string) {
  await httpClient.delete(`/cart/items/${productId}`, {
    headers: { Authorization: token },
  });
}
