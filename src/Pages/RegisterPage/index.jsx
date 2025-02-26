import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import signup from "../../assets/images/signup.png";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Divider,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required!"),
    lastName: z.string().min(1, "Last name is required!"),
    email: z.string().email("Invalid email!").min(1, "Email is required!"),
    phone: z.string().min(9, "Phone number must be at least9 digits!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    confirmPassword: z.string().min(1, "Confirm password is required!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(errors);

  // Handle form submission
  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    console.log(data);

    axios
      .post("https://67aec39a9e85da2f020e488f.mockapi.io/user_Info", {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email_Adress: data.email,
        Phone: data.phone,
        Password: data.password,
      })
      .then((value) => {
        toast.success("Registration successful! Please login.");
        // setOpenSnackbar(true);
        setLoading(false);
        navigate("/login-page");
      })
      .catch((err) => {
        toast.error("Failed to register. Please try again later.");

        setError("Failed to register. Please try again later.");
        // setOpenSnackbar(true);
        setLoading(false);
      });
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className="w-[90%] mx-auto mt-10">
        <Link to={"/register-page"}>
          <img src={Logo} alt="" />
        </Link>
        <div className="flex items-center flex-row-reverse justify-between gap-20">
          <div className="w-[40%]">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[640px]">
                <CardContent className="p-8">
                  <div className="space-y-4 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                      Sign up
                    </h1>
                    <p className="text-gray-600">
                      Let's get you all set up so you can access your personal
                      account.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        placeholder="John"
                        className="[&_.MuiOutlinedInput-root]:h-14"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        placeholder="Doe"
                        className="[&_.MuiOutlinedInput-root]:h-14"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    </div>
                    {/* Email and Phone Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        placeholder="john.doe@gmail.com"
                        className="[&_.MuiOutlinedInput-root]:h-14"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                      <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        placeholder="1234567890"
                        className="[&_.MuiOutlinedInput-root]:h-14"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    </div>
                    {/* Password Fields */}
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      className="[&_.MuiOutlinedInput-root]:h-14"
                      {...register("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              className="text-gray-500">
                              {showPassword ? (
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
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      className="[&_.MuiOutlinedInput-root]:h-14"
                      {...register("confirmPassword")}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              edge="end"
                              className="text-gray-500">
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
                    {/* Terms Agreement */}

                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <span className="text-sm">
                          I agree to all the{" "}
                          <Button
                            className="p-0 min-w-0 text-[#FF725E] normal-case font-normal hover:bg-transparent"
                            disableRipple>
                            Terms
                          </Button>
                          and{" "}
                          <Button
                            className="p-0 min-w-0 text-[#FF725E] normal-case font-normal hover:bg-transparent"
                            disableRipple>
                            Privacy Policies
                          </Button>
                        </span>
                      }
                    />
                    {/* Create Account Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      className="h-14 text-base normal-case bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Create account"
                      )}
                    </Button>
                    {/* Login Link */}
                    <div className="text-center">
                      <p className="text-sm">
                        Already have an account?{" "}
                        <Link
                          to={"/login-page"}
                          className="p-0 min-w-0 text-[#FF725E] normal-case font-normal hover:bg-transparent"
                          disableRipple>
                          Login
                        </Link>
                      </p>
                    </div>
                    {/* Social Login Section */}
                    <div className="space-y-6">
                      <div className="relative">
                        <Divider>
                          <span className="text-xs text-gray-500 px-2">
                            Or Sign up with
                          </span>
                        </Divider>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant="outlined"
                          className="h-14 border-gray-300 normal-case"
                          fullWidth>
                          <img src={facebook} alt="" />
                        </Button>
                        <Button
                          variant="outlined"
                          className="h-14 border-gray-300 normal-case"
                          fullWidth>
                          <img src={google} alt="" />
                        </Button>
                        <Button
                          variant="outlined"
                          className="h-14 border-gray-300 normal-case"
                          fullWidth>
                          <img src={apple} alt="" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </div>
            </div>
          </div>
          <div className="w-[fit]">
            <img className="w-[616px] !h-[616px]" src={signup} alt="" />
          </div>
        </div>
      </div>

      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}>
          {error || "Registration successful! Please login."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterPage;
