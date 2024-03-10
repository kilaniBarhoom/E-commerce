import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import PropTypes from "prop-types";

import * as MUI from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import CartView from "../Modals/CartView";
import CatDrawer from "./CatDrawer";
import UserPreferencesSettings from "../Modals/UserPreferenceSettings";

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

export default function TopNav({ darkMode, setDarkMode }) {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openSettingsPreferences, setOpenSettingsPreferences] =
    React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    setUser(localStorage.getItem("user"));
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
      {user != null && (
        <MUI.Box width={300}>
          {/* <MenuItem
            onClick={() => {
              nav("/login");
              handleMenuClose();
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              nav("/signup");
              handleMenuClose();
            }}
          >
            Signup
          </MenuItem> */}
          <MUI.Stack p={2} direction="row" alignItems="center" gap={1}>
            <MUI.Avatar sx={{ width: 35, height: 35 }}>
              {/* {loginInfo?.name[0].toUpperCase()} */}I
            </MUI.Avatar>
            <MUI.Stack>
              <MUI.Typography variant="h6" color="#000" fontWeight="900" p={0}>
                {/* {loginInfo?.name || "User Name"} */}
                {"User Name"}
              </MUI.Typography>
              <MUI.Typography color="rgba(0, 0, 0, 0.6)" fontSize="0.8rem">
                {/* {loginInfo?.email || "email@email.com"} */}
                {"email@email.com"}
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
              localStorage.removeItem("loginInfo");
              window.location.reload();
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <MUI.Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MUI.MenuItem>
        <MUI.IconButton
          onClick={() => setOpen(true)}
          size="large"
          aria-label="cart"
          color="inherit"
        >
          <MUI.Badge badgeContent={1} color="error">
            <AddShoppingCartIcon />
          </MUI.Badge>
        </MUI.IconButton>
        <p>Cart</p>
      </MUI.MenuItem>
      <MUI.MenuItem onClick={handleProfileMenuOpen}>
        <MUI.IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MUI.Avatar sx={{ width: 35, height: 35 }} />
        </MUI.IconButton>
        <p>Profile</p>
      </MUI.MenuItem>
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
      <CartView open={open} setOpen={setOpen} />
      <MUI.AppBar
        position="static"
        sx={{ bgcolor: "transparent", color: "#000", px: 0, boxShadow: "none" }}
      >
        <UserPreferencesSettings
          open={openSettingsPreferences}
          setOpen={setOpenSettingsPreferences}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
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
              src="./src/assets/shoplogo.png"
              width={30}
              alt=""
              style={{ transform: "rotateY(180deg)" }}
            />
            E-commerce
          </MUI.Typography>
          <MUI.Box sx={{ flexGrow: 1 }} />
          <MUI.Stack
            direction="row"
            gap={1}
            alignItems={"center"}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <MUI.IconButton
              className="hover:bg-transparent dark:text-white"
              onClick={() => setOpen(true)}
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <MUI.Badge badgeContent={1} color="error">
                <AddShoppingCartIcon />
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
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MUI.Avatar sx={{ width: 35, height: 35 }} />
            </MUI.IconButton>
          </MUI.Stack>
          <MUI.Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MUI.IconButton
              size="large"
              aria-label="menu"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <CatDrawer />
            </MUI.IconButton>
            <MUI.IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </MUI.IconButton>
          </MUI.Box>
        </MUI.Toolbar>
      </MUI.AppBar>
      {renderMobileMenu}
      {renderMenu}
    </MUI.Box>
  );
}

TopNav.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
