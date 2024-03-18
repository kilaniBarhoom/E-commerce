import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import * as React from "react";
// import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

// import { BaseURL, token, userId } from "../Contexts/Vars";
// import { Avatar } from "@mui/material";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "100%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 0,
};

const items = [
  {
    image: "./assets/food.png",
    name: "food",
    count: 1,
    price: 10,
  },
  {
    image: "./assets/food.png",
    name: "food",
    count: 1,
    price: 10,
  },
  {
    image: "./assets/food.png",
    name: "food",
    count: 1,
    price: 10,
  },
];

export default function CartView({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState(false);

  function addCount(i) {
    items[i].count++;
    setState((s) => !s);
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box p={2}>
            <Box align="left">
              <Button
                variant="text"
                onClick={handleClose}
                sx={{ p: "0", minWidth: "0px" }}
              >
                <span
                  style={{
                    color: "#000",
                    display: "flex",
                    padding: " 5px",
                    width: "30px",
                  }}
                >
                  <CloseIcon
                    style={{
                      padding: "0",
                      marging: "0",
                    }}
                  />
                </span>
              </Button>
            </Box>
            <Typography variant="h4">Shopping Cart</Typography>
            <Stack direction="row" justifyContent="space-between" my={5}>
              <Stack
                id="products-container"
                border="solid rgba(0, 0, 0, 0.5) 1px"
                borderRadius={1}
                gap={1}
                flex={1}
              >
                {items.map((item, ind) => {
                  return (
                    <Stack
                      borderBottom="solid rgba(0, 0, 0, 0.5) 1px"
                      p={1}
                      key={ind}
                      direction="row"
                      id="cart-product-container"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <img width={100} src={item.image} alt="nope" />
                      <Stack alignItems="center" justifyContent="center">
                        <Typography>{item.name}</Typography>
                        <Button color="error" variant="text" size="small">
                          Delete
                        </Button>
                      </Stack>

                      <Stack
                        id="counter"
                        direction="row"
                        alignItems="center"
                        borderRadius={1}
                        border="solid rgba(0, 0, 0, 0.5) 1px"
                      >
                        <Button
                          sx={{
                            color: "#000",
                            fontSize: "1.3rem",
                          }}
                          size="small"
                        >
                          -
                        </Button>
                        <Box
                          flex={1}
                          borderLeft="solid rgba(0, 0, 0, 0.5) 1px"
                          borderRight="solid rgba(0, 0, 0, 0.5) 1px"
                          px={1}
                        >
                          {item.count}
                        </Box>
                        <Button
                          onClick={() => addCount(ind)}
                          sx={{
                            color: "#000",
                            fontSize: "1.1rem",
                          }}
                          size="small"
                        >
                          +
                        </Button>
                      </Stack>
                      <Typography>${item.price}</Typography>
                    </Stack>
                  );
                })}
              </Stack>
              <Stack id="total-price-container" flex={1}>
                <Typography>Price</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
