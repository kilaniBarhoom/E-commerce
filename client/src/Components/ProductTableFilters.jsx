import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import * as MUI from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
export default function ProductTableFilters({ selectedRows }) {
  const [stockFilter, setStockFilter] = useState("All");

  return (
    <MUI.Box className="flex flex-row gap-2 p-4 w-full items-center justify-between">
      <MUI.Stack direction="row" gap={1}>
        <MUI.Box className="relative rounded-lg">
          <MUI.TextField
            size="small"
            className="px-2 w-72 focus-within:w-96 transform ease-in-out duration-300"
            placeholder="Search for products"
          />
          <MUI.Box className="absolute rounded-r-md w-14 items-center justify-center right-2 top-0 bg-blue-500 flex p-2 text-neutral-200">
            <SearchIcon />
          </MUI.Box>
        </MUI.Box>

        <MUI.FormControl>
          <MUI.InputLabel id="demo-simple-select-label">Stock</MUI.InputLabel>
          <MUI.Select
            size="small"
            className="min-w-52 w-60 rounded-lg"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stockFilter}
            label="Stock"
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <MUI.MenuItem value={"All"}>All</MUI.MenuItem>
            <MUI.MenuItem value={"Active"}>Active</MUI.MenuItem>
            <MUI.MenuItem value={"Pending"}>Pending</MUI.MenuItem>
            <MUI.MenuItem value={"Sold Out"}>Sold Out</MUI.MenuItem>
          </MUI.Select>
        </MUI.FormControl>
      </MUI.Stack>
      <MUI.Box>
        <MUI.Button
          variant="text"
          size="small"
          disabled={selectedRows.length === 0}
          className="text-red-400 hover:text-red-500 hover:bg-transparent border-none disabled:text-neutral-500 group text-white font-bold py-2 px-4 rounded-md"
          startIcon={<DeleteIcon className="group-hover:animate-bounce" />}
        >
          Delete
        </MUI.Button>
      </MUI.Box>
    </MUI.Box>
  );
}

ProductTableFilters.propTypes = {
  selectedRows: PropTypes.array.isRequired,
};
