import { configureStore } from "@reduxjs/toolkit";
import loginApp from "./login/index";

export const store = configureStore({
  reducer: {
    loginApp,
  },
});
