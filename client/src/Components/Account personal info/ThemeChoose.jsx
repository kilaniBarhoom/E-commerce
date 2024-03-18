import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import * as MUI from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";

export const ThemeChoose = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <MUI.Stack className="flex flex-col gap-3 w-full ">
      <MUI.Typography
        variant="h4"
        className="text-neutral-900 dark:text-neutral-100 flex flex-row items-center gap-3"
      >
        <SettingsIcon
          fontSize="large"
          className="rounded-full p-1 bg-neutral-300 dark:bg-neutral-800"
        />{" "}
        Theme
      </MUI.Typography>
      <MUI.Box className=" gap-3 dark:bg-neutral-800 dark:border-neutral-500 border-solid border-2 p-7 rounded-md">
        <MUI.Stack className="justify-around w-full flex flex-row my-2 gap-5">
          <MUI.Button
            onClick={() => {
              setDarkMode(false);
              localStorage.setItem("darkMode", false);
            }}
            variant="outlined"
            className={`w-full h-52 border-solid border-2 dark:border-neutral-500 flex flex-col gap-2 ${
              darkMode ? "bg-transparent" : "bg-[rgba(0, 0, 0, 0.4)]"
            } text-white dark:hover:bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(0,0,0,0.2)] hover:border-[rgba(0,0,0,0.2)] dark:hover:border-[rgba(255,255,255,0.1)]`}
          >
            <WbSunnyIcon
              className="dark:text-white text-black"
              fontSize="large"
            />
            <MUI.Typography
              className="normal-case font-semibold dark:text-white text-black"
              variant="h6"
            >
              LightMode
            </MUI.Typography>
          </MUI.Button>
          <MUI.Button
            onClick={() => {
              setDarkMode(true);
              localStorage.setItem("darkMode", true);
            }}
            variant="outlined"
            className={`w-full h-52 border-solid border-2 dark:border-neutral-500 flex flex-col gap-2 ${
              darkMode
                ? "dark:bg-[rgba(255,255,255,0.2)] bg-[rgba(0, 0, 0, 0.2)]"
                : "bg-transparent"
            } text-white dark:hover:bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(0,0,0,0.2)] hover:border-[rgba(0,0,0,0.2)] dark:hover:border-[rgba(255,255,255,0.1)]`}
          >
            <DarkModeIcon
              className="dark:text-white text-black"
              fontSize="large"
            />
            <MUI.Typography
              className="normal-case font-semibold dark:text-white text-black"
              variant="h6"
            >
              DarkMode
            </MUI.Typography>
          </MUI.Button>
        </MUI.Stack>
      </MUI.Box>
    </MUI.Stack>
  );
};
