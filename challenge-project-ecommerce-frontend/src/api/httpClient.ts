// src/api/httpClient.ts

import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3004',
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate(); // Get navigation function
    const { logout } = useContext(AuthContext); // Get logout function

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('Unauthorized! Logging out...');
      logout(); // Clear token
      navigate('/'); // Redirect to Home Page
    }
    return Promise.reject(error);
  }
);

export default httpClient;