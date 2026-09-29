import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fashionkart-ysoc.onrender.com/api',
});

export const fetchProducts = () => API.get('/products');
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const placeOrder = (data) => API.post('/orders', data);