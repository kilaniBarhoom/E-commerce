import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Stack } from "@mui/material";
import ProductCategories from "../Constants/ProductCategories";

export default function CategoryNav() {
  const { productCategories } = ProductCategories();
  return (
    <Box className="leftNav">
      <h2 className="dark:text-white">Categories</h2>
      <Stack alignItems="start" gap={1}>
        {productCategories.map((category) => (
          <Button
            key={category.id}
            startIcon={category.icon}
            className="hover:bg-neutral-600 px-3 dark:text-white w-full min-w-50 justify-between"
            onClick={() => {
              console.log(category.name);
            }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            {category.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
