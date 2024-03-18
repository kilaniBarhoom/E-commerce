import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as MUI from "@mui/material";
import { useState } from "react";
import axios from "../../AxiosCredintialsCookie";

export const Security = () => {
  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errorChangingPassword, setErrorChangingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChngePassword = async (e) => {
    e.preventDefault();
    setErrorChangingPassword(false);
    if (
      password.oldPassword !== "" &&
      password.newPassword !== "" &&
      password.confirmPassword !== ""
    ) {
      setError({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
      setErrorMessage("");
    }
    if (password.oldPassword === "") {
      setError({ ...error, oldPassword: true });
      return;
    }
    if (password.newPassword === "") {
      setError({ ...error, newPassword: true });
      return;
    }
    if (password.confirmPassword === "") {
      setError({ ...error, confirmPassword: true });
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      setErrorChangingPassword(true);
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put("/auth/update-password", {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword,
      });
      if (res && res.status === 200) {
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // MUI.snackbar.success("Password changed successfully");
      }
    } catch (error) {
      if (error.response) {
        setErrorChangingPassword(true);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <MUI.Box>
      <MUI.Box className="w-full  bg-[url('/assets/securitypagebg.png')] bg-cover p-5 shadow-md rounded-md h-44">
        <MUI.Typography
          variant="h3"
          className="text-neutral-100 font-bold tracking-wider"
        >
          Security
        </MUI.Typography>
      </MUI.Box>
      <MUI.Stack className="flex flex-col gap-3 mt-10">
        <MUI.Typography
          variant="h4"
          className="text-neutral-900 dark:text-neutral-100 flex flex-row items-center gap-3"
        >
          <KeyIcon
            fontSize="large"
            className="rounded-full p-1 bg-neutral-300 dark:bg-neutral-800"
          />{" "}
          Change Password
        </MUI.Typography>
        <form onSubmit={handleChngePassword}>
          <MUI.Box className="flex flex-col gap-3 dark:bg-neutral-800 dark:border-neutral-500 border-solid border-2 p-7 rounded-md">
            {errorChangingPassword && (
              <MUI.Alert
                severity="error"
                color="error"
                variant="filled"
                className="mb-4"
              >
                {errorMessage}
              </MUI.Alert>
            )}
            <MUI.Stack className="flex flex-col gap-1 relative w-full">
              <label
                htmlFor="oldpassword"
                className="text-neutral-600 dark:text-neutral-300"
              >
                Old Password
              </label>
              <input
                type={`${visibility.oldPassword ? "text" : "password"}`}
                id="oldpassword"
                className="bg-transparent shadow-none border-solid border-2 dark:border-neutral-500 outline-none h-[50px] dark:hover:border-white dark:focus-within:border-white
             dark:placeholder:text-neutral-500 dark:text-white p-5 rounded-md text-lg "
                value={password.oldPassword}
                onChange={(e) => {
                  setPassword({ ...password, oldPassword: e.target.value });
                  setError({ ...error, oldPassword: false });
                }}
              />
              {error.oldPassword && (
                <MUI.Typography variant="caption" className="text-red-500">
                  Old Password is required
                </MUI.Typography>
              )}
              {visibility.oldPassword ? (
                <MUI.IconButton
                  className="absolute top-7 dark:text-white right-2"
                  onClick={() =>
                    setVisibility({
                      ...visibility,
                      oldPassword: !visibility.oldPassword,
                    })
                  }
                >
                  <VisibilityIcon />
                </MUI.IconButton>
              ) : (
                <MUI.IconButton
                  className="absolute top-7 dark:text-white right-2"
                  onClick={() =>
                    setVisibility({
                      ...visibility,
                      oldPassword: !visibility.oldPassword,
                    })
                  }
                >
                  <VisibilityOffIcon />
                </MUI.IconButton>
              )}
            </MUI.Stack>
            <MUI.Stack className="flex flex-col gap-1 mt-5 relative w-full">
              <label
                htmlFor="newpassword"
                className="text-neutral-600 dark:text-neutral-300"
              >
                New Password
              </label>
              <input
                type={`${visibility.newPassword ? "text" : "password"}`}
                id="newpassword"
                className=" bg-transparent shadow-none border-solid border-2 dark:border-neutral-500 outline-none h-[50px] dark:hover:border-white dark:focus-within:border-white
             dark:placeholder:text-neutral-500 dark:text-white p-5 rounded-md text-lg "
                value={password.newPassword}
                onChange={(e) => {
                  setPassword({ ...password, newPassword: e.target.value });
                  setError({ ...error, newPassword: false });
                }}
              />
              {error.newPassword && (
                <MUI.Typography variant="caption" className="text-red-500">
                  New Password is required
                </MUI.Typography>
              )}
              {visibility.newPassword ? (
                <MUI.IconButton
                  className="absolute top-7 dark:text-white right-2"
                  onClick={() =>
                    setVisibility({
                      ...visibility,
                      newPassword: !visibility.newPassword,
                    })
                  }
                >
                  <VisibilityIcon />
                </MUI.IconButton>
              ) : (
                <MUI.IconButton
                  className="absolute top-7 dark:text-white right-2"
                  onClick={() =>
                    setVisibility({
                      ...visibility,
                      newPassword: !visibility.newPassword,
                    })
                  }
                >
                  <VisibilityOffIcon />
                </MUI.IconButton>
              )}
            </MUI.Stack>
            <MUI.Stack className="flex flex-col gap-1 relative w-full">
              <label
                htmlFor="confirmpassword"
                className="text-neutral-600 dark:text-neutral-300"
              >
                Confirm Password
              </label>
              <input
                type={`${visibility.confirmPassword ? "text" : "password"}`}
                id="confirmpassword"
                className=" bg-transparent shadow-none border-solid border-2 dark:border-neutral-500 outline-none h-[50px] dark:hover:border-white dark:focus-within:border-white
             dark:placeholder:text-neutral-500 dark:text-white p-5 rounded-md text-lg "
                value={password.confirmPassword}
                onChange={(e) => {
                  setPassword({ ...password, confirmPassword: e.target.value });
                  setError({ ...error, confirmPassword: false });
                }}
              />
              {error.confirmPassword && (
                <MUI.Typography variant="caption" className="text-red-500">
                  Confirm Password is required
                </MUI.Typography>
              )}
              {visibility.confirmPassword ? (
                <MUI.IconButton
                  className="absolute top-7 dark:text-white right-2"
                  onClick={() =>
                    setVisibility({
                      ...visibility,
                      confirmPassword: !visibility.confirmPassword,
                    })
                  }
                >
                  <VisibilityIcon />
                </MUI.IconButton>
              ) : (
                <MUI.IconButton
                  className="absolute top-7 dark:text-white right-2"
                  onClick={() =>
                    setVisibility({
                      ...visibility,
                      confirmPassword: !visibility.confirmPassword,
                    })
                  }
                >
                  <VisibilityOffIcon />
                </MUI.IconButton>
              )}
            </MUI.Stack>

            <MUI.Box className="flex justify-end">
              <MUI.Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className="w-fit normal-case mt-5"
              >
                Change Password
              </MUI.Button>
            </MUI.Box>
          </MUI.Box>
        </form>
      </MUI.Stack>
    </MUI.Box>
  );
};
