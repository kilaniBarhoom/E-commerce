import { Typography, Box, Stack, Divider, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { FadeIn } from "react-fade-in/lib/FadeIn";
import { useForm } from "react-hook-form";

export default function Signup() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
      {/* <FadeIn> */}
      <Box
        id="form-content"
        mx="auto"
        mt={2}
        height="60%"
        borderRadius={3}
        width={400}
        border="solid 2px #58B6CE"
        p={3}
      >
        <Stack id="login-container" gap={5}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#000">
              Get started shopping at{" "}
              <span style={{ color: "#58B6CE" }}>FreshCart</span>
            </Typography>
            <Typography
              variant="span"
              fontWeight={600}
              color=" rgba(0, 0, 0, 0.5) "
            >
              Welcome to FreshCart enter your email to get started
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={5}>
              <Stack gap={1}>
                <input
                  placeholder="Username"
                  {...register("username", {
                    pattern: /^[a-zA-Z0-9_]{2,}$/,
                  })}
                />
                {errors.username && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    Invalid username
                  </span>
                )}
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
                    minLength: 8,
                  })}
                />
                {errors.password && !errors.email && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    Password should be atleast 8 characters
                  </span>
                )}
              </Stack>
              <Stack gap={1}>
                <Button fullWidth type="submit" variant="contained">
                  Register
                </Button>
                <Typography color="rgba(0, 0, 0, 0.9) ">
                  Already have an account?{" "}
                  <Link style={{ textDecoration: "none" }} to="/login">
                    Login
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
      {/* </FadeIn> */}
    </div>
  );
}
