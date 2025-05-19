// src/api.js or axiosInstance.js
import axios from 'axios';

// Create an Axios instance with a base URL for the backend API
const axiosInstance = axios.create({
  baseURL: 'https://mockup4clients.com/task-management-backend/api', // Replace with your Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;