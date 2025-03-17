import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role); // Extracts the role directly from the decoded token
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        logout();
      }
    }
  }, [token]);

  function login(newToken: string) {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    try {
      const decoded: any = jwtDecode(newToken);
      setRole(decoded.role);
    } catch (error) {
      console.error('Failed to decode JWT:', error);
    }
  }

  function logout() {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
