import { createSlice } from "@reduxjs/toolkit"
import { fetchRegistration } from "./userFetch";

const initialState = {
    auth: false,
    user:{
        id: "",
        email: "",
        isActivated: false,
    },
    error: "",
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRegistration.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRegistration.fulfilled, (state) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchRegistration.rejected, (state, payload) => {
            state.loading = false;
            state.error = payload.error as string;
        });
    }
})

export const { reducer } = userSlice;