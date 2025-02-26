import { configureStore } from "@reduxjs/toolkit";
import { loginApp } from "./login";

export const store = configureStore({
  reducer: {
    loginApp,
  },
});
