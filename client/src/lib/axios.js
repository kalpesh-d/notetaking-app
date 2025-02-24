import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Add a request interceptor to add the token
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
