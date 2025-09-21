import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // If backend uses cookies
});

// Auth APIs
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

// Contact API
export const sendContact = (data) => API.post("/contact", data);

// Optional: add a request interceptor to log requests for debugging
API.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);
