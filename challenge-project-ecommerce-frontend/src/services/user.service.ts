import httpClient from '../api/httpClient';

export async function getAllUsers(token: string) {
  const resp = await httpClient.get('/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function getUserById(id: string, token: string) {
  const resp = await httpClient.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function createAdminUser(
  data: { email: string; password: string, name: string },
  token: string
) {
  const resp = await httpClient.post('/auth/register-admin', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function createUser(
  data: { email: string; password: string, name: string }
) {
  const resp = await httpClient.post('/auth/register', data);
  return resp.data;
}

export async function updateUser(id: string, data: any, token: string) {
  const resp = await httpClient.patch(`/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.data;
}

export async function deleteUser(id: string, token: string) {
  await httpClient.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
