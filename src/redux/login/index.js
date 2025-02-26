import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoggedIn: false,
  userInfo: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // Action to handle login
    loginApp(state, { payload }) {
      console.log("Payload:", payload);
      state.user = payload; // Store the logged-in user data
      state.isLoggedIn = true; // Update login status
      state.error = null; // Clear any previous errors
    },
    // Action to handle logout
    logoutApp(state) {
      state.user = null; // Clear user data
      state.isLoggedIn = false; // Update login status
      state.error = null; // Clear any errors
    },
    // Action to handle login errors
    loginError(state, { payload }) {
      state.error = payload; // Store the error message
      state.isLoggedIn = false; // Ensure login status is false
    },
  },
});

// Export actions
export const { loginApp, logoutApp, loginError } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;
