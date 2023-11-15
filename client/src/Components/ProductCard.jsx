import React, { useState } from "react";
import { Stack, Typography, Rating, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "../Styles/LandingProducts.css";

const ProductCard = ({ productContent }) => {
  return (
    <div className="landing-products-container">
      <div className="landing-products-content">
        {productContent.map((slide, index) => (
          <div key={index} className="landing-product">
            <Stack gap={5}>
              <img width={150} src={slide.image} alt="nope" />
              <Stack gap={1}>
                <Typography
                  variant="span"
                  fontSize={13}
                  fontWeight={600}
                  style={{ color: "rgba(0, 0, 0, 0.6)" }}
                >
                  {slide.category}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  style={{ color: "rgba(0, 0, 0)" }}
                >
                  {slide.text}
                </Typography>
                <Typography style={{ color: "rgba(0, 0, 0)" }}>
                  <Rating
                    name="read-only"
                    value={slide.rating}
                    size="small"
                    readOnly
                  />
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Tooltip title="Add To Cart" arrow>
                    <IconButton color="success" aria-label="add" size="large">
                      <AddShoppingCartIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    style={{ color: "rgba(0, 0, 0)" }}
                  >
                    {slide.price}
                  </Typography>
                  <Tooltip title="View" arrow>
                    <IconButton aria-label="view" size="large">
                      <RemoveRedEyeIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
