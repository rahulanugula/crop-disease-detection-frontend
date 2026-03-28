import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        username,
        email,
        password,
      });
      return true;
    } catch (error) {
      console.error('Registration error', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
