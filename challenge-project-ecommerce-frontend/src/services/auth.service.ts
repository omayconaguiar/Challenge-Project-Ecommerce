import httpClient from '../api/httpClient';

export async function loginUser(email: string, password: string) {
  const resp = await httpClient.post('/auth/login', { email, password });
  return resp.data; 
  /* 
    Expecting resp.data like:
    {
      access_token: "xxx",
      access_expires_in: 900,
      refresh_token: "yyy",
      refresh_expires_in: 604800
      ...
    }
  */
}

export async function registerUser(email: string, password: string) {
  const resp = await httpClient.post('/auth/register', { email, password });
  return resp.data; 
  /*
    Typically { id, email, role }
  */
}
