import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import httpClient from '../api/httpClient';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const resp = await httpClient.post('/auth/login', { email, password });
      login(resp.data.access_token);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}
