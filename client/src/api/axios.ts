import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
    withCredentials: true,
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
    config!.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default api