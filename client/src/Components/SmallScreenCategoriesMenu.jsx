import ProductCategories from "../Constants/ProductCategories";
import { Button, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

export default function SmallScreenCategoriesMenu({ anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);
  const { productCategories } = ProductCategories();

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {productCategories.map((category, ind) => (
        <MenuItem key={ind}>
          <Button
            sx={{ color: "#000" }}
            onClick={() => {
              setAnchorEl(null);
              console.log(category.name);
            }}
            startIcon={category.icon}
          >
            {category.name}
          </Button>
        </MenuItem>
      ))}
    </Menu>
  );
}

SmallScreenCategoriesMenu.propTypes = {
  anchorEl: PropTypes.object.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
};
