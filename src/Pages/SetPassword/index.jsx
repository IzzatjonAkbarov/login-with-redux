import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { z } from "zod";
import Logo from "../../assets/images/Logo.png";
import { loginApp, editingPassword } from "../../redux/login/index";

import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { ChevronLeft, Visibility, VisibilityOff } from "@mui/icons-material";
import forgotpassword from "../../assets/images/forgotpassword.png";
import { toast } from "react-toastify";

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data, user, email } = useSelector((state) => state.loginApp);

  const handleResetPassword = async () => {
    try {
      setError(null);
      passwordSchema.parse({ newPassword, confirmPassword });
      setLoading(true);

      const { data: users } = await axios.get(
        "https://67aec39a9e85da2f020e488f.mockapi.io/user_Info"
      );

      const user = users.find((user) => user.Email_Adress === email);

      if (user) {
        await axios.put(
          `https://67aec39a9e85da2f020e488f.mockapi.io/user_Info/${user.id}`,
          { Password: newPassword }
        );

        toast.success("Password reset successfully");
        console.log(email);

        navigate("/login-page");
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "An error occurred. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-[90%] mx-auto">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <div className="flex items-center justify-between gap-20">
        <div className="w-[40%] min-h-screen flex items-center justify-center bg-white">
          <Card className="w-full max-w-[512px] shadow-none">
            <CardContent>
              <Button
                startIcon={<ChevronLeft />}
                className="text-gray-600 normal-case p-0 hover:bg-transparent mb-6"
                disableRipple
                onClick={() => navigate("/login-page")}>
                Back to login
              </Button>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Reset your password
              </h1>
              <p className="text-gray-600 mb-4">
                Create a new password for your account.
              </p>
              {error && <Alert severity="error">{error}</Alert>}
              <form className="space-y-6">
                <TextField
                  fullWidth
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}>
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }>
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <br />
                <Button
                  fullWidth
                  variant="contained"
                  className="h-14 text-base normal-case bg-[#6C63FF] hover:bg-[#6C63FF]/90"
                  onClick={handleResetPassword}
                  disabled={loading}>
                  {loading ? "Resetting..." : "Reset password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="w-fit">
          <img
            className="w-[616px] h-[616px]"
            src={forgotpassword}
            alt="Forgot Password"
          />
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
