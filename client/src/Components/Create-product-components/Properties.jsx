import * as MUI from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import Select from "react-select";

export default function Properties({ updateProductData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryOptions = [
    { value: "Cameras", label: "Cameras" },
    { value: "Electronics", label: "Electronics" },
    { value: "Outdoors", label: "Outdoors" },
    { value: "Indoors", label: "Indoors" },
    { value: "Accessories", label: "Accessories" },
    { value: "Clothes&Shoes", label: "Clothes&Shoes" },
    { value: "Books", label: "Books" },
    { value: "Sports", label: "Sports" },
    { value: "Food", label: "Food" },
    { value: "Laptops", label: "Laptops" },
  ];

  // Handler for category select change
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    // Update product data with the selected category value
    updateProductData("category", selectedOption ? selectedOption.value : "");
  };

  return (
    <MUI.Stack className="flex flex-row justify-center w-full gap-6">
      <MUI.Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
        <MUI.Typography variant="h5" className="dark:text-white font-normal">
          Properties
        </MUI.Typography>
        <MUI.Typography
          variant="subtitle2"
          className="dark:text-neutral-500 font-normal"
        >
          quantity, stock, category...
        </MUI.Typography>
      </MUI.Box>
      <MUI.Stack
        className="rounded-xl bg-neutral-200 dark:bg-neutral-800 p-8 gap-4"
        flex={1.5}
      >
        <MUI.Typography
          variant="h6"
          sx={{ display: { xs: "flex", md: "none" } }}
          className="dark:text-white  font-normal mb-2"
        >
          Properties
        </MUI.Typography>
        <MUI.Stack className="gap-4 flex flex-row ">
          <input
            type="number"
            className="bg-transparent border-neutral-500  hover:border-white focus-within:border-white
             placeholder:text-neutral-500 text-white p-5 w-full rounded-lg text-lg h-[30px]"
            placeholder="Quantity"
            onChange={(e) => updateProductData("quantity", e.target.value)}
          />
          <input
            type="number"
            min={0}
            max={100000}
            className="bg-transparent border-neutral-500 w-full hover:border-white focus-within:border-white
             placeholder:text-neutral-500 text-white p-5 h-[30px] rounded-lg text-lg "
            placeholder="Stock"
            onChange={(e) => updateProductData("stock", e.target.value)}
          />
        </MUI.Stack>
        <Select
          className="w-full bg-transparent border-neutral-500 hover:border-white focus-within:border-white"
          styles={{ backgroundColor: "transparent" }}
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Category"
        />
      </MUI.Stack>
    </MUI.Stack>
  );
}

Properties.propTypes = {
  updateProductData: PropTypes.func.isRequired,
};
