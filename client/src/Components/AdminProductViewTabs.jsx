import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Review } from "./Review";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminProductViewTabs({ reviews }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            className="dark:text-white"
            label="All Reviews"
            {...a11yProps(0)}
          />
          <Tab
            className="dark:text-white"
            label="Recent reviews"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className="SBR">
        <Stack className="dark:bg-neutral-800 bg-neutral-100 gap-8 rounded-md divide-y-2 divide-solid divide-x-0 divide-neutral-500">
          {(reviews.length > 3 ? reviews.slice(0, 3) : reviews)?.map(
            (review, index) => (
              <Review key={index} review={review} />
            )
          )}
          {reviews.length > 3 && (
            <Button
              className="w-full border-solid border-transparent border-t-2 border-t-neutral-400 text-black dark:text-neutral-400 rounded-none normal-case px-4 dark:hover:text-white"
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                "&:focus": { backgroundColor: "transparent" },
                "&:active": { backgroundColor: "transparent" },
              }}
              variant="text"
            >
              View more
            </Button>
          )}
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}

AdminProductViewTabs.propTypes = {
  reviews: PropTypes.array.isRequired,
};
