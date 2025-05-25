import axios from "axios";

export const api = axios.create({
  baseURL: "http://147.45.167.235:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add custom error handling here
    // Например, обработка 401 для обновления токена
    return Promise.reject(error);
  }
);
