import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const initialState = {
  data: [],
  isLoggedIn: false,
  userInfo: null,
  error: null,
  email: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginApp(state, payload) {
      const userData = payload.payload.allData.find(
        (user) =>
          user.Email_Adress === payload.payload.payload.Email_Adress &&
          user.Password === payload.payload.payload.Password
      );

      if (userData) {
        Cookies.set("user", JSON.stringify(payload.payload.payload), {
          expires: 1,
        });
        state.user = payload.payload;
        state.isLoggedIn = true;
        state.error = null;
      } else {
        state.error = "Invalid email or password";
      }
    },

    editingPassword(state, { payload }) {
      state.email = payload;
    },
  },
});

export const { loginApp, logoutApp, loginError, editingPassword } =
  loginSlice.actions;

export default loginSlice.reducer;
