import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginApp } from "../../redux/login";

////images
import Logo from "../../assets/images/Logo.png";
import LoginImg from "../../assets/images/LoginImg.png";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const token = Cookies.get("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, user } = useSelector((state) => state.loginApp);

  const [alldata, setAllData] = useState([]);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    axios
      .get("https://67aec39a9e85da2f020e488f.mockapi.io/user_Info")
      .then((res) => {
        setAllData(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch user data. Please try again later.");
      });
  }, []);

  const schema = z.object({
    email: z.string().email("Invalid email!").min(1, "Email is required!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const userinfo = alldata.find(
      (value) =>
        value.Email_Adress === data.email && value.Password === data.password
    );

    if (userinfo) {
      dispatch(loginApp({ payload: userinfo, allData: alldata }));
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="w-[90%] mx-auto mt-10">
      <Link to={"/login-page"}>
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="flex items-center justify-between mt-10 gap-20">
        <div className="w-[40%]">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="font-normal text-[#313131] opacity-75">
            Login to access your Travelwise account
          </p>

          <div className="w-full flex items-center justify-center bg-white mt-4">
            <Card className="w-full shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    placeholder="example@gmail.com"
                    className="[&_.MuiOutlinedInput-root]:h-14"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <br />
                  <br />

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
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <FormControlLabel
                      control={<Checkbox />}
                      label={<span className="text-sm">Remember me</span>}
                    />
                    <Link
                      to={"/forgot-password"}
                      className="text-[#FF725E] text-sm">
                      Forgot Password
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      bgcolor: "#6C63FF",
                      "&:hover": { bgcolor: "#6C63FF90" },
                    }}
                    className="h-14 text-base normal-case ">
                    {loading ? <CircularProgress size={24} /> : "Login"}
                  </Button>

                  <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#FF725E]">
                      Sign up
                    </Link>
                  </p>

                  <Divider className="my-4">
                    <span className="text-xs text-gray-500">Or login with</span>
                  </Divider>
                  <br />

                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outlined" className="h-14 border-gray-300">
                      <img src={facebook} alt="Facebook" />
                    </Button>
                    <Button variant="outlined" className="h-14 border-gray-300">
                      <img src={google} alt="Google" />
                    </Button>
                    <Button variant="outlined" className="h-14 border-gray-300">
                      <img src={apple} alt="Apple" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <img
            className="w-[616px] h-[616px]"
            src={LoginImg}
            alt="Login Illustration"
          />
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
