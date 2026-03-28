import axios from 'axios';

// Resolve API base URL at runtime to avoid accidentally hitting localhost in deployed builds.
const apiBaseFromEnv = import.meta.env.VITE_API_BASE_URL;
const isVercel = typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app');
const fallbackProd = 'https://crop-disease-detection-backend-wfyq.onrender.com/api';
const fallbackLocal = 'http://localhost:8080/api';

let resolvedBase = apiBaseFromEnv || (isVercel ? fallbackProd : fallbackLocal);

// Safety net: if a stale bundle still carries localhost, override to prod when running on vercel/app.
if (isVercel && resolvedBase.includes('localhost')) {
  resolvedBase = fallbackProd;
}

const api = axios.create({
  baseURL: resolvedBase,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
