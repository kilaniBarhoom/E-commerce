import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";

// import { ThemeContext } from "@emotion/react";
import * as MUI from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
import axios from "../AxiosCredintialsCookie";
import UserPreferencesSettings from "../Modals/UserPreferenceSettings";
import PropTypes from "prop-types";
import { GetProfileOfAUser } from "../Utils/GetProfileOfAUser";

const settingsLoggedIn = [
  {
    setting: "Home",
    navigate: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    setting: "Account",
    navigate: "/account",
    icon: <PersonOutlineOutlinedIcon />,
  },
];

export default function TopNav({ socket }) {
  // const { darkMode, setDarkMode } = React.useContext(ThemeContext);
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSettingsPreferences, setOpenSettingsPreferences] =
    React.useState(false);
  // const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    const createNotificationOfLoggedIn = (userId) => {
      const { getProfileOfAUser } = GetProfileOfAUser();
      const user = getProfileOfAUser(userId);
      return user;
    };
    socket?.on("userLoggedIn", async (userId) => {
      console.log(
        "User Logged In:",
        await createNotificationOfLoggedIn(userId)
      );
    });
  }, [socket]);

  const handleUserLogout = async () => {
    localStorage.removeItem("user");
    try {
      const res = await axios.get("/auth/logout");
      if (res) {
        nav("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <MUI.Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!user ? (
        <MUI.Box width={200}>
          <MUI.MenuItem
            onClick={() => {
              nav("/login");
              handleMenuClose();
            }}
          >
            Login
          </MUI.MenuItem>
          <MUI.MenuItem
            onClick={() => {
              nav("/signup");
              handleMenuClose();
            }}
          >
            Signup
          </MUI.MenuItem>
        </MUI.Box>
      ) : (
        <MUI.Box width={300}>
          <MUI.Stack p={2} direction="row" alignItems="center" gap={1}>
            <MUI.Avatar src={user?.avatar?.url} sx={{ width: 35, height: 35 }}>
              {/* {loginInfo?.name[0].toUpperCase()} */}I
            </MUI.Avatar>
            <MUI.Stack>
              <MUI.Typography variant="h6" color="#000" fontWeight="900" p={0}>
                {/* {loginInfo?.name || "User Name"} */}
                {user?.username || "User Name"}
              </MUI.Typography>
              <MUI.Typography color="rgba(0, 0, 0, 0.6)" fontSize="0.8rem">
                {/* {loginInfo?.email || "email@email.com"} */}
                {user?.email || "email@email.com"}
              </MUI.Typography>
            </MUI.Stack>
          </MUI.Stack>

          <MUI.Divider sx={{ borderStyle: "dashed", opacity: 1 }} />
          {settingsLoggedIn.map((setting, index) => (
            <MUI.MenuItem
              key={index}
              onClick={() => {
                handleMenuClose();
                nav(setting.navigate);
              }}
              sx={{
                m: 1,
                p: 1,
                borderRadius: 1,
                color: "black",
                fontWeight: 800,
              }}
            >
              <MUI.Stack direction="row" gap={1}>
                {setting.icon}
                <MUI.Typography>{setting.setting}</MUI.Typography>
              </MUI.Stack>
            </MUI.MenuItem>
          ))}
          <MUI.Divider sx={{ borderStyle: "dashed" }} />
          <MUI.MenuItem
            onClick={() => {
              handleUserLogout();
            }}
            sx={{
              mx: 1,
              borderRadius: 1,
            }}
          >
            <MUI.Typography
              sx={{
                color: "#ff005f",
                fontWeight: 700,
                width: "100%",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Logout
            </MUI.Typography>
          </MUI.MenuItem>
        </MUI.Box>
      )}
    </MUI.Menu>
  );

  return (
    <MUI.Box
      sx={{
        flexGrow: 1,
        borderBottom: "solid rgba(255, 255, 255, 0.1) 1px",
        mb: 2,
      }}
    >
      <MUI.AppBar
        position="static"
        sx={{ bgcolor: "transparent", color: "#000", px: 0, boxShadow: "none" }}
      >
        <UserPreferencesSettings
          open={openSettingsPreferences}
          setOpen={setOpenSettingsPreferences}
        />
        <MUI.Toolbar sx={{ p: 0 }}>
          <MUI.Typography
            variant="h5"
            fontWeight={600}
            noWrap
            component="div"
            className="dark:text-white cursor-pointer flex flex-row items-center gap-2"
            onClick={() => nav("/")}
          >
            <img
              src="./assets/shoplogo.png"
              width={30}
              alt=""
              style={{ transform: "rotateY(180deg)" }}
            />
            E-commerce
          </MUI.Typography>
          <MUI.Box sx={{ flexGrow: 1 }} />
          <MUI.Stack
            direction="row"
            alignItems={"center"}
            sx={{ gap: { sx: 0, md: 1 } }}
          >
            <MUI.IconButton
              className="hover:bg-transparent dark:text-white"
              // onClick={() => setOpen(true)}
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <MUI.Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </MUI.Badge>
            </MUI.IconButton>
            <MUI.Tooltip title="Settings" arrow disableInteractive>
              <MUI.IconButton
                onClick={() => setOpenSettingsPreferences(true)}
                className="text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-200 rotate-0 hover:rotate-45 transition-transform duration-300 ease-in-out"
              >
                <SettingsSharpIcon fontSize="medium" className="text-3xl" />
              </MUI.IconButton>
            </MUI.Tooltip>
            <MUI.IconButton
              sx={{ "&:hover": { backgroundColor: "transparent" }, p: 0 }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MUI.Avatar
                src={user?.avatar?.url}
                sx={{ width: 35, height: 35 }}
              />
            </MUI.IconButton>
          </MUI.Stack>
        </MUI.Toolbar>
      </MUI.AppBar>
      {renderMenu}
    </MUI.Box>
  );
}

TopNav.propTypes = {
  socket: PropTypes.object,
};
