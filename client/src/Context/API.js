import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api",
  // baseURL: 'https://q-a-production.up.railway.app/api',
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
