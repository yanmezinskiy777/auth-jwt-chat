import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthResponse } from "../models/AuthResponse";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  config!.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (
      error.response?.status == 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const result = await axios.get<AuthResponse>(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", result.data.accessToken);
        return api.request(originalRequest);
      } catch (error) {}
    }
  }
);

export default api;
