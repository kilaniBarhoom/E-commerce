import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 340, md: 400 },
  backgroundColor: "rgb(38, 38, 38)",
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
};

export default function UserPreferencesSettings({ open, setOpen }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box id="content" position={"relative"}>
            <Typography
              color={"#fff"}
              id="modal-modal-title"
              variant="h5"
              component="h2"
              mb={2}
            >
              Settings
            </Typography>
            <Tooltip title="Close" placement="top" arrow disableInteractive>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 2,
                  color: "#fff",
                  p: 0,
                  m: 0,
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Stack>
              <Typography color={"rgba(255, 255, 255, 0.6)"}>
                Appearance
              </Typography>
              <Stack
                my={2}
                direction="row"
                width={"100%"}
                justifyContent={"space-around"}
              >
                <Button
                  onClick={() => {
                    setDarkMode(false);
                    localStorage.setItem("darkMode", false);
                  }}
                  variant="outlined"
                  sx={{
                    width: 120,
                    height: 100,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    bgcolor: darkMode
                      ? "transparent"
                      : "rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.1)  ",
                    },
                  }}
                >
                  <WbSunnyIcon fontSize="large" />
                </Button>
                <Button
                  onClick={() => {
                    setDarkMode(true);
                    localStorage.setItem("darkMode", true);
                  }}
                  variant="outlined"
                  sx={{
                    width: 120,
                    height: 100,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    bgcolor: darkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.1)  ",
                    },
                  }}
                >
                  <DarkModeIcon fontSize="large" />
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

UserPreferencesSettings.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
