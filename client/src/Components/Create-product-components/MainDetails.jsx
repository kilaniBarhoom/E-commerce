import * as MUI from "@mui/material";
import Images from "./Images";
import PropTypes from "prop-types";

export default function MainDetails({ updateProductData }) {
  return (
    <MUI.Stack className="flex flex-row justify-center w-full gap-6">
      <MUI.Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
        <MUI.Typography variant="h5" className="dark:text-white font-normal">
          Product Main Details
        </MUI.Typography>
        <MUI.Typography
          variant="subtitle2"
          className="dark:text-neutral-500 font-normal"
        >
          name, description, images...
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
          Main Details
        </MUI.Typography>
        <input
          type="text"
          className="bg-transparent border-neutral-500 h-[60px] hover:border-white focus-within:border-white
             placeholder:text-neutral-500 text-white p-5 rounded-lg text-lg "
          placeholder="Product Name"
          onChange={(e) => updateProductData("name", e.target.value)}
        />
        <textarea
          className="bg-transparent min-h-[160px]  border-neutral-500  hover:border-white focus-within:border-white placeholder:text-neutral-500 text-white text-lg rounded-lg p-4 outline-none resize-none w-full"
          placeholder="Product Description "
          onChange={(e) => updateProductData("description", e.target.value)}
        />
        <MUI.Typography
          variant="body1"
          className="font-bold text-md dark:text-white mt-3"
        >
          Images
        </MUI.Typography>
        <Images updateProductData={updateProductData} />
      </MUI.Stack>
    </MUI.Stack>
  );
}

MainDetails.propTypes = {
  updateProductData: PropTypes.func.isRequired,
};
