import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useNavigate } from "react-router-dom";
import CategoryNav from "../Components/CategoryNav";
import ProductSearchBar from "../Components/ProductSearchBar";
import ProductsDisplay from "../Components/ProductsDisplay";
import SmallScreenCategoriesMenu from "../Components/SmallScreenCategoriesMenu";
import productContent from "../Constants/SampleProducts";
import { GetAllProducts } from "../Utils/GetAllProducts";
import "../Styles/Categories.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loadingToGetProducts, setLoadingToGetProducts] = useState(true);
  const nav = useNavigate();
  const { getAllProducts } = GetAllProducts({
    setLoadingToGetProducts,
    setProducts,
  });
  useEffect(() => {
    getAllProducts();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  function valuetext(value) {
    return `${value} $`;
  }

  const [value, setValue] = useState([0, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <FadeIn>
      <Box>
        <Box mt={3} role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="dark:text-white"
            mb={2}
          >
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
            <Link
              underline="none"
              className="dark:text-neutral-400"
              aria-current="page"
            >
              Clothes & Shoes
            </Link>
          </Breadcrumbs>
        </Box>
        <Stack direction="row" gap="3%">
          <CategoryNav />
          <Box className="rightNav" width="100%">
            <ProductSearchBar />
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
                <Typography
                  variant="span"
                  className="text-neutral-800 dark:text-white"
                >
                  24 Products fround
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
                <SmallScreenCategoriesMenu
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                />
              </Stack>

              <Stack direction="row" gap={2}>
                <Stack sx={{ width: 200 }}>
                  <Typography className="font-bold dark:text-white">
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
                    fontWeight={400}
                    className="dark:text-neutral-200"
                  >
                    <span className="dark:text-neutral-200">Price: </span>
                    {`$${value[0]} - $${value[1]}`}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <ProductsDisplay products={products} />
          </Box>
        </Stack>
      </Box>
    </FadeIn>
  );
}
