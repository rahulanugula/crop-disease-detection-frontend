import axios from 'axios';

// Hard-stop localhost in production. Even if env vars are missing or cached builds linger,
// Vercel-hosted builds will point to the Render API.
const isVercel = typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app');
const apiBaseFromEnv = import.meta.env.VITE_API_BASE_URL;
const renderBase = 'https://crop-disease-detection-backend-wfyq.onrender.com/api';
const localBase = 'http://localhost:8080/api';

let resolvedBase;
if (import.meta.env.PROD) {
  resolvedBase = apiBaseFromEnv && !apiBaseFromEnv.includes('localhost')
    ? apiBaseFromEnv
    : renderBase;
} else {
  resolvedBase = apiBaseFromEnv || (isVercel ? renderBase : localBase);
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
