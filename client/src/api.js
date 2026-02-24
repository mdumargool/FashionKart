import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if using a different port or domain
});

export const fetchProducts = () => API.get('/products');
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const placeOrder = (data) => API.post('/orders', data);
