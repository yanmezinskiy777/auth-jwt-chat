import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkAuth,
  login,
  logout,
  registration,
} from "../../services/AuthService";

interface IFetch {
  email: string;
  password: string;
}

const fetchRegistration = createAsyncThunk(
  "user/fetchRegistration",
  ({ email, password }: IFetch) => registration(email, password)
);

const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  ({ email, password }: IFetch) => login(email, password)
);

const fetchLogout = createAsyncThunk("user/fetchLogout", () => logout());

const fetchCheckAuth = createAsyncThunk("user/fetchCheckAuth", () =>
  checkAuth()
);

export { fetchRegistration, fetchLogin, fetchLogout, fetchCheckAuth };
