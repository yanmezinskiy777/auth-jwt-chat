import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
