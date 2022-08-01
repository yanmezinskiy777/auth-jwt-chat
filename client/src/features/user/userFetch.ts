import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { AuthResponse } from "../../models/AuthResponse";
import { registration } from "../../services/AuthService";

const fetchRegistration = createAsyncThunk(
  "user/fetchRegistration",
  ({ email, password }: any) => registration(email, password)
);

export { fetchRegistration };
