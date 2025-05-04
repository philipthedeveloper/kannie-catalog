import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./layout/layoutSlice";
import loginSlice from "./auth/login/loginSlice";
import analyticsSlice from "./analytics/analyticsSlice";
import { contentReducer } from "./content/contentSlice";

export const store = configureStore({
  reducer: {
    Layout: layoutSlice,
    Login: loginSlice,
    Analytics: analyticsSlice,
    Content: contentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
