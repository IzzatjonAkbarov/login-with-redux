import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ForgotPassword from "../Pages/ForgotPassword";
import SetPassword from "../Pages/SetPassword";
import HomePage from "../Pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/login-page",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/set-password",
        Component: SetPassword,
      },
    ],
  },
]);
