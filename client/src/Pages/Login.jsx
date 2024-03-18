import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../AxiosCredintialsCookie";
import PropTypes from "prop-types";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const nav = useNavigate();

  const isDarkMode = () => {
    return localStorage.getItem("darkMode") === "true";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorLoggingIn(false);
    setErrorMessage("");
    try {
      const res = await axios.post("auth/login", data);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        nav("/");
        // window.location.reload();
      }
    } catch (error) {
      setErrorLoggingIn(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleShowPassword = (e) => {
    e.target.checked ? setPasswordType("text") : setPasswordType("password");
  };

  return (
    <div className="align-middle flex justify-center items-center">
      {pageLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={pageLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Stack
        direction="row"
        className="p-5 bg-white dark:bg-neutral-900 gap-10"
        alignItems="center"
        sx={{ boxShadow: { xs: "none", md: 10 } }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <img
            onLoad={() => setPageLoading(false)}
            width={500}
            height={500}
            src={
              isDarkMode()
                ? "/assets/login-signup-img-dark.png"
                : "/assets/login-signup-img.jpg"
            }
            alt=""
          />
        </Box>

        <Box
          className="bg-transparent darkl:text-white border-r-20"
          sx={{ boxShadow: { xs: 10, md: "none" }, p: { xs: 5, md: 0 } }}
          width={400}
        >
          <Stack id="login-container" gap={5}>
            {errorLoggingIn && (
              <Alert severity="error" color="error" variant="filed">
                {errorMessage}
              </Alert>
            )}
            <Box>
              <Typography
                variant="h4"
                fontWeight={900}
                className="dark:text-white"
              >
                Welcome To E-commerce
              </Typography>
              <Typography
                variant="span"
                fontWeight={600}
                className="dark:text-neutral-400"
              >
                Welcome back to Projects enter your email to get started
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                <Stack gap={1}>
                  <input
                    style={{ borderColor: errors.email ? "red" : "" }}
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                      required: "Enter your email address",
                    })}
                    className="p-3 text-base rounded-md outline-none
                    border-2
                    border-solid
                     border-neutral-500
                    dark:border-neutral-600
                    dark:bg-transparent
                    dark:text-white
                    dark:hover:border-neutral-300 dark:focus:border-neutral-300 dark:placeholder-neutral-300 dark:placeholder-opacity-50
                    caret-neutral-500 dark:caret-neutral-500
                    "
                  />
                  {errors.email && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      Invalid Email
                    </span>
                  )}
                  <input
                    style={{ borderColor: errors.password ? "red" : "" }}
                    placeholder="Password"
                    type={passwordType}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="p-3 text-base rounded-md outline-none
                    border-2
                    border-solid
                     border-neutral-500
                    dark:border-neutral-600
                    dark:bg-transparent
                    dark:text-white
                    dark:hover:border-neutral-300 dark:focus:border-neutral-300 dark:placeholder-neutral-300 dark:placeholder-opacity-50
                    caret-neutral-500 dark:caret-neutral-500
                    "
                  />
                  {errors.password && !errors.email && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                      }}
                    >
                      {errors.password.message}
                    </span>
                  )}
                  <FormControlLabel
                    control={<Checkbox className="dark:text-white" />}
                    label="Show Password"
                    className="dark:text-white select-none"
                    onChange={handleShowPassword}
                  />
                </Stack>
                <Stack gap={1}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Login
                  </Button>
                  <Typography className="dark:text-white">
                    Don't have an account?{"  "}
                    <Link className="no-underline text-blue-500" to="/signup">
                      signup
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
