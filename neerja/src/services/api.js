import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true,
});


export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);


export const sendContact = (data) => API.post("/contact", data);
