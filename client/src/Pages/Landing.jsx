import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import Slide from "../Components/Landing Components/Slider";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Stepper from "../Components/Landing Components/Stepper";
import ProductCard from "../Components/ProductCard";
import { useNavigate } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function Landing() {
  const nav = useNavigate();

  const slideContent = [
    { image: "./src/assets/food.png", text: "Food" },
    { image: "./src/assets/electronics.png", text: "Electronics" },
    { image: "./src/assets/sports.png", text: "Sports" },
    { image: "./src/assets/clothes.png", text: "Clothes" },
  ];
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
  ];
  return (
    <Box>
      <Box px={4}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            id="basic-button"
            variant="outlined"
            aria-haspopup="true"
            onClick={() => nav("/categories")}
            sx={{ fontWeight: "700", fontSize: "1.4rem" }}
            size="large"
          >
            Start Shopping
          </Button>
          <div>
            <Button
              sx={{ color: "#000", textDecoration: "underline" }}
              variant="text"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </Box>
      <hr
        style={{
          marginTop: 20,
          borderTop: "solid rgba(0, 0, 0, 0.3) 1px",
        }}
      />
      <FadeIn>
        <Stack gap={5} px={4}>
          <Stepper
            images={[
              <Box
                width="100%"
                height={450}
                sx={{
                  background: "url(./src/assets/grocbg.png)",
                  borderRadius: 2,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPositionY: "-50px",
                }}
                mt={3}
                display="flex"
                justifyContent="end"
                pt={5}
              >
                <Stack gap={5} color="#000" width="37%" alignItems="start">
                  <Box>
                    <Typography letterSpacing={2} fontWeight={700} variant="h3">
                      SuperMarket For Fresh Grocery
                    </Typography>
                    <Typography color="rgba(0, 0, 0, 0.5)" variant="h6">
                      Introduced a new model for online grocery shopping and
                      convinient home delivery.
                    </Typography>
                  </Box>

                  <Button
                    endIcon={<KeyboardArrowRightIcon />}
                    variant="contained"
                  >
                    Shop now
                  </Button>
                </Stack>
              </Box>,
              <Box
                width="100%"
                height={450}
                sx={{
                  background: "url(./src/assets/clothesbg1.png)",
                  borderRadius: 2,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPositionY: "-50px",
                }}
                mt={3}
                display="flex"
                justifyContent="start"
                pt={5}
                pl={5}
              >
                <Stack gap={5} color="#000" width="37%" alignItems="start">
                  <Box>
                    <Typography letterSpacing={2} fontWeight={700} variant="h3">
                      Free Shipping on orders over{" "}
                      <span style={{ color: "green" }}>100$</span>
                    </Typography>
                    <Typography color="rgba(0, 0, 0, 0.5)" variant="h6">
                      Free shipping to First-Time-Customers Only. After
                      promotions and discounts are applied
                    </Typography>
                  </Box>

                  <Button
                    endIcon={<KeyboardArrowRightIcon />}
                    variant="contained"
                  >
                    Shop now
                  </Button>
                </Stack>
              </Box>,
            ]}
          />
          <Box>
            <h2>Featured Categories</h2>
            <Slide content={slideContent} />
          </Box>
          <Stack direction="row" gap={5} flexWrap="wrap">
            <Box
              height={230}
              flex={1}
              sx={{
                background: "url(./src/assets/clothesbg.png)",
                backgroundSize: "cover",
                borderRadius: 2,
                boxShadow: "0px 0px 8px 0.5px rgba(0, 0, 0, 0.7)",
              }}
              mt={3}
              display="flex"
              justifyContent="start"
              pt={5}
            >
              <Stack gap={5} pl={2} color="#000" width="50%" alignItems="start">
                <Box>
                  <Typography fontWeight={900} variant="h4">
                    Clothes & Shoes
                  </Typography>
                  <Typography color="rgba(0, 0, 0, 0.7)" variant="h6">
                    Get up to{" "}
                    <span style={{ color: "#000", fontWeight: "600" }}>
                      30%
                    </span>{" "}
                    off
                  </Typography>
                </Box>

                <Button variant="contained">Shop now</Button>
              </Stack>
            </Box>
            <Box
              height={230}
              flex={1}
              sx={{
                background: "url(./src/assets/foodbg.png)",
                backgroundSize: "cover",
                borderRadius: 2,
                boxShadow: "0px 0px 8px 0.5px rgba(0, 0, 0, 0.7)",
              }}
              mt={3}
              display="flex"
              justifyContent="end"
              pt={5}
            >
              <Stack gap={5} pl={2} color="#000" width="50%" alignItems="start">
                <Box>
                  <Typography fontWeight={900} variant="h4">
                    Clothes & Shoes
                  </Typography>
                  <Typography color="rgba(0, 0, 0, 0.7)" variant="h6">
                    Get up to{" "}
                    <span style={{ color: "#000", fontWeight: "600" }}>
                      25%
                    </span>{" "}
                    off
                  </Typography>
                </Box>

                <Button variant="contained">Shop now</Button>
              </Stack>
            </Box>
          </Stack>
          <Box>
            <h2>Popular Products</h2>
            <ProductCard productContent={productContent} />
          </Box>
        </Stack>
      </FadeIn>
    </Box>
  );
}
