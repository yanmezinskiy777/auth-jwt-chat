import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/AuthResponse";
import { fetchCheckAuth, fetchLogin, fetchLogout, fetchRegistration } from "./userFetch";

const initialState = {
  auth: false,
  user: {
    id: "",
    email: "",
    isActivated: false,
  },
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.auth = true;
      state.user = action.payload.data.user as IUser;
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
      state.auth = false;
      state.user = initialState.user;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.auth = true;
      state.user = action.payload.data.user as IUser;
    });
    builder.addCase(fetchLogin.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload.error as string;
      state.auth = false;
      state.user = initialState.user;
    });
    builder.addCase(fetchLogout.pending, (state) => {
        state.loading = true;
    })
    builder.addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.auth = false;
        state.error = "";
        state.user = initialState.user;
    })
    builder.addCase(fetchCheckAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.auth = true;
        state.user = action.payload.data.user as IUser;
      });
  },
});

export const { reducer } = userSlice;
