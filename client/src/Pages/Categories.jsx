import * as React from "react";
import {
  Link,
  Breadcrumbs,
  Box,
  Stack,
  Button,
  Slider,
  Divider,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LaptopIcon from "@mui/icons-material/Laptop";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import HeadsetIcon from "@mui/icons-material/Headset";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import DeckIcon from "@mui/icons-material/Deck";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import FadeIn from "react-fade-in/lib/FadeIn";
import "../Styles/Categories.css";

export default function Categories() {
  const productContent = [
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
    {
      image: "./src/assets/food.png",
      category: "Food",
      text: "Lettus",
      rating: 5,
      price: "10$",
    },
  ];

  const nav = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  function valuetext(value) {
    return `${value} $`;
  }

  const [value, setValue] = React.useState([0, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FadeIn>
      <Box px={3}>
        <Divider />
        <Box mt={3} role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" mb={2}>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              onClick={() => nav("/")}
            >
              Dashboard
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Shop
            </Link>
            <Link underline="none" color="text.primary" aria-current="page">
              Clothes & Shoes
            </Link>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" gap="3%">
          <Box className="leftNav">
            <h2>Categories</h2>
            <Stack alignItems="start" gap={0.5}>
              <Stack
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.5)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                justifyContent="space-between"
                direction="row"
              >
                All
                <KeyboardArrowRightIcon />
              </Stack>
              <Stack
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.4)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                justifyContent="space-between"
                direction="row"
              >
                <Stack direction="row" gap={1}>
                  <CameraAltIcon />
                  <Typography>Cameras</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                justifyContent="space-between"
                direction="row"
              >
                <Stack direction="row" gap={1}>
                  <LaptopIcon />
                  <Typography>Laptops</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                justifyContent="space-between"
                direction="row"
              >
                <Stack direction="row" gap={1}>
                  <EarbudsIcon />
                  <Typography>Accessories</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                justifyContent="space-between"
                direction="row"
              >
                <Stack direction="row" gap={1}>
                  <HeadsetIcon />
                  <Typography>Headphones</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={1}>
                  <FastfoodIcon />
                  <Typography>Food</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={1}>
                  <ImportContactsIcon />
                  <Typography>Books</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={1}>
                  <CheckroomIcon />
                  <Typography>Clothes/Shoes</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={1}>
                  <SportsFootballIcon />
                  <Typography>Sports</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={1}>
                  <DeckIcon />
                  <Typography>Outdoor</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>

              <Stack
                size="small"
                alignItems="center"
                borderRadius={1}
                p={0.5}
                sx={{
                  color: "#000",
                  border: "solid 1px rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => console.log(1)}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" gap={1}>
                  <SingleBedIcon />
                  <Typography>Home</Typography>
                </Stack>
                <KeyboardArrowRightIcon />
              </Stack>
            </Stack>
          </Box>
          <Box className="rightNav" width="100%">
            <Box
              className="category-name"
              display="flex"
              alignItems="center"
              justifyContent="start"
              p={4}
              bgcolor="rgba(230, 230, 230, 0.7)"
              borderRadius={5}
            >
              <Typography variant="h4" color="#000" fontWeight={700}>
                Clothes / Shoes
              </Typography>
            </Box>
            <Stack
              mt={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={4}
            >
              <Stack
                direction="row"
                gap={4}
                alignItems="center"
                flexWrap="wrap"
              >
                <Typography variant="span" color="rgba(0, 0, 0, 0.7)">
                  <span style={{ color: "#000", fontWeight: "700" }}>24</span>{" "}
                  Products fround
                </Typography>
                <Button
                  className="categ-btn"
                  aria-controls={open ? "basic-menu" : undefined}
                  variant="contained"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick1}
                  endIcon={<KeyboardArrowRightIcon />}
                  size="small"
                  sx={{
                    bgcolor: "#000",
                    height: "fit-content",
                    display: "none",
                  }}
                >
                  Choose category
                </Button>
              </Stack>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={() => {
                      handleClose();
                      nav("/categories");
                    }}
                  >
                    All
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<CameraAltIcon />}
                  >
                    Cameras
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<LaptopIcon />}
                  >
                    Laptops
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<EarbudsIcon />}
                  >
                    Accessories
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<HeadsetIcon />}
                  >
                    Headphones
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<FastfoodIcon />}
                  >
                    Food
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<ImportContactsIcon />}
                  >
                    Books
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<CheckroomIcon />}
                  >
                    Clothes/Shoes
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<SportsFootballIcon />}
                  >
                    Sports
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<DeckIcon />}
                  >
                    Outdoor
                  </Button>
                </MenuItem>

                <MenuItem>
                  <Button
                    sx={{ color: "#000" }}
                    onClick={handleClose}
                    startIcon={<SingleBedIcon />}
                  >
                    Home
                  </Button>
                </MenuItem>
              </Menu>
              <Stack direction="row" gap={2}>
                <Stack sx={{ width: 200 }}>
                  <Typography variant="span" fontWeight={700}>
                    Price:
                  </Typography>
                  <Slider
                    getAriaLabel={() => "Price"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={500}
                    sx={{ color: "green" }}
                    size="small"
                  />
                  <Typography
                    variant="span"
                    fontWeight={600}
                    color="rgba(0, 0, 0, 0.7)"
                  >
                    <span style={{ color: "rgba(0, 0, 0, 0.4)" }}>Price: </span>
                    {`$${value[0]} - $${value[1]}`}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <ProductCard productContent={productContent} />
          </Box>
        </Stack>
      </Box>
    </FadeIn>
  );
}
