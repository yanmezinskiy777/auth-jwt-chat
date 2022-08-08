import axios, { AxiosResponse } from "axios";
import api from "../api/axios";
import { AuthResponse } from "../models/AuthResponse";

const registration = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  const result = await api.post<AuthResponse>("/auth/registration", {
    email,
    password,
  });
  localStorage.setItem("token", result.data.accessToken);
  console.log(result);
  return result;
};

const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  const result = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", result.data.accessToken);
  console.log(result);
  return result;
};

const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
  return await api.post("/auth/logout");
};

const checkAuth = async (): Promise<AxiosResponse<AuthResponse>> => {
  try {
    const result = await axios.get<AuthResponse>(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("token", result.data.accessToken);
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error.response?.data?.message);
    throw new Error(error.message);
  }
};

export { registration, login, logout, checkAuth };
