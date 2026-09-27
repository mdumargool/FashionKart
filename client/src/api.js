import axios from 'axios';

// Yeh Vite ke environment variables ko check karega, agar nahi mila toh localhost use karega
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const fetchProducts = () => API.get('/products');
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const placeOrder = (data) => API.post('/orders', data);