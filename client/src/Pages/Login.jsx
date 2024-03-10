import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box py={3} px={5}>
        <Typography
          variant="h5"
          fontWeight={600}
          noWrap
          component="div"
          sx={{
            display: { xs: "flex", sm: "flex", cursor: "pointer" },
          }}
          onClick={() => nav("/")}
        >
          <img
            src="./src/assets/shoplogo.png"
            width={30}
            alt=""
            style={{ transform: "rotateY(180deg)" }}
          />
          E-commerce
        </Typography>
      </Box>
      <Divider />
      <Box
        mx="auto"
        mt={5}
        height="60%"
        borderRadius={3}
        width={400}
        border="solid 2px #58B6CE"
        p={3}
      >
        <Stack id="login-container" gap={5}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#000">
              Log In to FreshCart
            </Typography>
            <Typography
              variant="span"
              fontWeight={600}
              color=" rgba(0, 0, 0, 0.5) "
            >
              Welcome back to FreshCart enter your email to get started
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <Stack gap={1}>
                <input
                  placeholder="Email"
                  {...register("email", {
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    Invalid Email
                  </span>
                )}

                <input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && !errors.email && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.password.message}
                  </span>
                )}
              </Stack>
              <Stack gap={1}>
                <Button fullWidth type="submit" variant="contained">
                  Login
                </Button>
                <Typography color="rgba(0, 0, 0, 0.9) ">
                  Dont have an account?{" "}
                  <Link style={{ textDecoration: "none" }} to="/signup">
                    Sign up
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  );
}
