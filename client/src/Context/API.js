import axios from 'axios';

const api = axios.create({
  baseURL: 'https://q-a-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
