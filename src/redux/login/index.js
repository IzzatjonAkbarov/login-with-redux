import { createSlice } from "@reduxjs/toolkit";

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
    loginApp(state, { payload }) {
      console.log("Payload:", payload);
      state.user = payload;
      state.isLoggedIn = true;
      state.error = null;
    },

    editingPassword(state, { payload }) {
      state.email = payload;
      console.log(state.email);
    },
  },
});

export const { loginApp, logoutApp, loginError, editingPassword } =
  loginSlice.actions;

export default loginSlice.reducer;
