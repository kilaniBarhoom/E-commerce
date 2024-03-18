import { Box, Button, Stack } from "@mui/material";
import ProductCategories from "../Constants/ProductCategories";

export default function CategoryNav() {
  const { productCategories } = ProductCategories();
  return (
    <Box className="leftNav">
      <h2 className="dark:text-white">Categories</h2>
      <Stack className="w-60 gap-1 items-start">
        {productCategories.map((category) => (
          <Button
            key={category.id}
            startIcon={category.icon}
            className="dark:hover:bg-neutral-800 w-full justify-start text-neutral-600 dark:text-neutral-300 px-3 p-2 normal-case font-semibold"
            onClick={() => {
              console.log(category.name);
            }}
          >
            {category.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
