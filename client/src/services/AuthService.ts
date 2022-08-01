import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../api/axios";
import { AuthResponse } from "../models/AuthResponse";

const registration = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
  const result = await api.post<AuthResponse>("/auth/registration", {
    email,
    password,
  });
  console.log(result);
  return result as any;
}

const login = (email: string, password: string) =>
  createAsyncThunk(
    "user/login",
    async (): Promise<AxiosResponse<AuthResponse>> => {
      return await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
    }
  );

const logout = () =>
  createAsyncThunk("user/logout", async (): Promise<void> => {
    return await api.post("/auth/logout");
  });

export { registration, login, logout };
