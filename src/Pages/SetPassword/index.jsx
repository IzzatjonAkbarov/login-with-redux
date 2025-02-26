import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import forgotpassword from "../../assets/images/forgotpassword.png";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ChevronLeft, Visibility, VisibilityOff } from "@mui/icons-material";

const SetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-[90%] mx-auto ">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="flex items-center justify-between  gap-20">
          <div className="w-[40%]">
            <div className="min-h-screen flex items-center justify-center bg-white ">
              <Card className="w-full max-w-[512px] shadow-none">
                <CardContent className="">
                  <div className="mb-8">
                    <Button
                      startIcon={<ChevronLeft />}
                      className="text-gray-600 normal-case p-0 hover:bg-transparent mb-6"
                      disableRipple
                      onClick={() => navigate("/login-page")} // Redirect to login page
                    >
                      Back to login
                    </Button>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      Reset your password
                    </h1>
                    <p className="text-gray-600">
                      Create a new password for your account. Make sure it's
                      strong and unique.
                    </p>
                  </div>

                  <form className="space-y-6">
                    <TextField
                      fullWidth
                      label="New Password"
                      type={showNewPassword ? "text" : "password"}
                      variant="outlined"
                      className="[&_.MuiOutlinedInput-root]:h-14"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              edge="end"
                              className="text-gray-500">
                              {showNewPassword ? (
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
                    <br />
                    <br />

                    <Button
                      fullWidth
                      variant="contained"
                      className="h-14 text-base normal-case bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                      Reset password
                    </Button>

                    <div className="space-y-6">
                      <div className="relative">
                        <Divider>
                          <span className="text-xs text-gray-500 px-2">
                            Or login with
                          </span>
                        </Divider>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          variant="outlined"
                          className="h-14 border-gray-300 normal-case"
                          fullWidth>
                          <img src={facebook} alt="Facebook" />
                        </Button>
                        <Button
                          variant="outlined"
                          className="h-14 border-gray-300 normal-case"
                          fullWidth>
                          <img src={google} alt="Google" />
                        </Button>
                        <Button
                          variant="outlined"
                          className="h-14 border-gray-300 normal-case"
                          fullWidth>
                          <img src={apple} alt="Apple" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
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
    </div>
  );
};

export default SetPassword;
