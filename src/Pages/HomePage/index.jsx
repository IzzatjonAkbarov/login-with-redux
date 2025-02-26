import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const headerStyles = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  textAlign: "center",
  borderBottom: "1px solid #dee2e6",
};
const HomePage = () => {
  const token = Cookies.get("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login-page");
    }
  }, []);
  const Logout = () => {
    Cookies.remove("user");
    navigate("/login-page");
  };
  return (
    <div>
      <header style={headerStyles}>
        <h1>Welcome to the Home Page</h1>
      </header>
      <Button variant="contained" onClick={() => Logout()}>
        Log out
      </Button>
    </div>
  );
};

export default HomePage;
