import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
