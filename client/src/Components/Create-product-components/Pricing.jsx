import * as MUI from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Pricing({ updateProductData }) {
  const [taxInclude, setTaxInclude] = useState(false);
  return (
    <MUI.Stack className="flex flex-row justify-center w-full gap-6">
      <MUI.Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
        <MUI.Typography variant="h5" className="dark:text-white font-normal">
          Pricing
        </MUI.Typography>
        <MUI.Typography
          variant="subtitle2"
          className="dark:text-neutral-500 font-normal"
        >
          price, tax...
        </MUI.Typography>
      </MUI.Box>
      <MUI.Stack
        className="gap-4 -solid p-8 rounded-xl bg-neutral-200 dark:bg-neutral-800"
        flex={1.5}
      >
        <MUI.Typography
          variant="h6"
          sx={{ display: { xs: "flex", md: "none" } }}
          className="dark:text-white  font-normal mb-2"
        >
          Pricing
        </MUI.Typography>
        <MUI.Stack className="flex flex-row justify-between gap-3">
          <MUI.Box className="relative w-full">
            <MUI.Typography
              variant="h3"
              className="absolute top-3 left-5 text-xl text-neutral-500"
            >
              $
            </MUI.Typography>
            <input
              type="number"
              step="0.01"
              min={0}
              className="bg-transparent border-neutral-500 h-[50px] w-full hover:border-white focus-within:border-white
             placeholder:text-neutral-500 text-white p-5 pl-10 rounded-lg text-lg "
              placeholder="Product price"
              onChange={(e) => updateProductData("price", e.target.value)}
            />
          </MUI.Box>
          <MUI.Box className="relative w-full">
            <MUI.Typography
              variant="h3"
              className="absolute top-3 left-5 text-xl text-neutral-500"
            >
              $
            </MUI.Typography>
            <input
              type="number"
              step="0.01"
              min={0}
              className="bg-transparent border-neutral-500 h-[50px] w-full hover:border-white focus-within:border-white
             placeholder:text-neutral-500 text-white p-5 pl-10 rounded-lg text-lg "
              placeholder="Sale price"
              onChange={(e) => updateProductData("salePrice", e.target.value)}
            />
          </MUI.Box>
        </MUI.Stack>
        <MUI.Stack gap={1}>
          <MUI.FormControlLabel
            sx={{ m: 0, mt: 2 }}
            control={
              <MUI.Switch
                sx={{ m: 0 }}
                checked={taxInclude}
                onClick={() => {
                  setTaxInclude(!taxInclude);
                }}
              />
            }
            label="Include tax"
            className="dark:text-white"
          />
          <MUI.Box className="relative w-full m-0">
            <MUI.Typography
              variant="h3"
              className="absolute top-3 left-5 text-xl text-neutral-500"
            >
              %
            </MUI.Typography>
            <input
              type="number"
              step="0.01"
              min={0}
              className="bg-transparent border-neutral-500 h-[50px] w-full hover:border-white focus-within:border-white
             placeholder:text-neutral-500 text-white p-5 pl-10 rounded-lg text-lg "
              placeholder="Tax rate"
              disabled={!taxInclude}
              onChange={(e) => updateProductData("tax", e.target.value)}
            />
          </MUI.Box>
        </MUI.Stack>
      </MUI.Stack>
    </MUI.Stack>
  );
}

Pricing.propTypes = {
  updateProductData: PropTypes.func.isRequired,
};
