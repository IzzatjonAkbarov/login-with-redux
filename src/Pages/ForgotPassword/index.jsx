import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import forgotpassword from "../../assets/images/forgotpassword.png";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";

import apple from "../../assets/icons/apple.svg";
import { Card, CardContent, TextField, Button, Divider } from "@mui/material";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-[90%] mx-auto mt-10">
        <Link to={"/"}>
          <img src={Logo} alt="" />
        </Link>
        <div className="flex items-center justify-between mt-10 gap-20">
          <div className="w-[40%]">
            <div className="w-full flex items-center justify-center  p-4">
              <div className="w-full max-w-[512px] ">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <Button
                      onClick={() => navigate("/login-page")}
                      startIcon={<ChevronLeft />}
                      className="text-gray-600 normal-case p-0 hover:bg-transparent mb-6"
                      disableripple>
                      Back to login
                    </Button>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      Forgot your password?
                    </h1>
                    <p className="text-gray-600">
                      Don't worry, happens to all of us. Enter your email below
                      to recover your password
                    </p>
                  </div>

                  <form className="space-y-6">
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      placeholder="john.doe@gmail.com"
                      className="[&_.MuiOutlinedInput-root]:h-14"
                    />
                    <br />
                    <br />
                    <Button
                      fullWidth
                      variant="contained"
                      className="h-14 text-base normal-case bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                      Submit
                    </Button>

                    <div className="space-y-6 mt-10">
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
          <div className="w-[fit] ">
            <img className="w-[616px] !h-[616px]" src={forgotpassword} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
