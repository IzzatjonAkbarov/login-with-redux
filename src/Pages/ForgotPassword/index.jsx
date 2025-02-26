import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, TextField, Button, Divider } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Logo from "../../assets/images/Logo.png";
import forgotpassword from "../../assets/images/forgotpassword.png";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import { loginApp, editingPassword } from "../../redux/login/index";

// Zod schema for validation
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, user } = useSelector((state) => state.loginApp);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    dispatch(editingPassword(data.email));
    navigate("/set-password");
  };

  return (
    <div>
      <div className="w-[90%] mx-auto mt-10">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="flex items-center justify-between mt-10 gap-20">
          <div className="w-[40%]">
            <div className="w-full flex items-center justify-center p-4">
              <div className="w-full max-w-[512px]">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <Button
                      onClick={() => navigate("/login-page")}
                      startIcon={<ChevronLeft />}
                      className="text-gray-600 normal-case p-0 hover:bg-transparent mb-6"
                      disableRipple>
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

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Email"
                          variant="outlined"
                          placeholder="example@gmail.com"
                          className="[&_.MuiOutlinedInput-root]:h-14"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                    <br />
                    <br />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className="h-14 text-base normal-case bg-[#6C63FF] hover:bg-[#6C63FF]/90">
                      Submit
                    </Button>

                    {/* Social Login Options */}
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
              </div>
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

export default ForgotPassword;
