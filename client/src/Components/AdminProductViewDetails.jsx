import EmailIcon from "@mui/icons-material/Email";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PhoneIcon from "@mui/icons-material/Phone";
import { Chip } from "@mui/joy";
import * as MUI from "@mui/material";
import PropTypes from "prop-types";
import axios from "../AxiosCredintialsCookie";
import { useState } from "react";

export const AdminProductViewDetails = ({ product }) => {
  const [loadingToResolveProduct, setLoadingToResolveProduct] = useState(false);
  const stockGenerator = (stock) => {
    if (stock > 1000) {
      return (
        <Chip
          startDecorator={<FiberManualRecordIcon />}
          variant="soft"
          size="lg"
          className="font-bold"
          color="success"
        >
          In Stock
        </Chip>
      );
    } else if (stock > 100) {
      return (
        <Chip variant="soft" size={"lg"} color="neutral">
          Low on Stock
        </Chip>
      );
    } else if (stock > 0 && stock < 10) {
      return (
        <Chip variant="soft" size={"lg"} color="warning">
          Only {stock} left
        </Chip>
      );
    } else {
      return (
        <Chip variant="soft" size={"lg"} color="danger">
          Out of Stock
        </Chip>
      );
    }
  };
  const handleResolveProduct = async () => {
    setLoadingToResolveProduct(true);

    try {
      const res = await axios.post(`/products/${product._id}/resolve`);
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingToResolveProduct(false);
    }
  };

  return (
    <MUI.Stack className="flex flex-1 flex-col gap-5 relative">
      <MUI.Backdrop open={loadingToResolveProduct}>
        <MUI.CircularProgress />
      </MUI.Backdrop>
      <MUI.Typography
        variant="subtitle2"
        className="dark:text-neutral-400 absolute top-0 left-0"
      >
        {product.category}
      </MUI.Typography>
      <MUI.Typography variant="h5" className="dark:text-neutral-300 mt-5">
        {product.name}
      </MUI.Typography>
      <MUI.Stack className="flex flex-row items-center gap-3 w-3/4 rounded-md">
        <MUI.Typography
          variant="h5"
          className={`text-red-400  ${product.salePrice ? "line-through" : ""}`}
        >
          $ {product.price}
        </MUI.Typography>
        {product.salePrice && (
          <MUI.Typography variant="h5" className="dark:text-white">
            $ {product.salePrice}
          </MUI.Typography>
        )}
      </MUI.Stack>
      <MUI.Box>{stockGenerator(product.stock)}</MUI.Box>
      <MUI.Typography variant="h6" className="dark:text-neutral-400 my-4">
        {product.description}
      </MUI.Typography>

      <MUI.Divider className="opacity-60 dark:border-neutral-200 border-neutral-700" />

      <MUI.Stack gap={2}>
        <MUI.Typography variant="h6" className="dark:text-white">
          Number of people who bought this product{" "}
          <Chip
            size="lg"
            variant="solid"
            startDecorator={<PeopleAltIcon />}
            className="ml-2"
          >
            {product.sold}
          </Chip>
        </MUI.Typography>
        <MUI.Stack gap={1}>
          <MUI.Typography variant="h6" className="dark:text-white">
            Status{" "}
            <Chip
              size="lg"
              variant="soft"
              className="rounded-md ml-2"
              color={
                product.status === "Pending"
                  ? "warning"
                  : product.status === "Active"
                  ? "success"
                  : "danger"
              }
              //   startDecorator={<PeopleAltIcon />}
            >
              {product.status}
            </Chip>
          </MUI.Typography>
          <MUI.Button
            endIcon={<FactCheckIcon />}
            variant="contained"
            size="large"
            className={`${
              product.status === "Pending" ? "bg-blue-500" : ""
            } disabled:bg-green-800 normal-case w-fit text-white`}
            disabled={product.status === "Active"}
            onClick={handleResolveProduct}
          >
            {product.status === "Pending"
              ? "Resolve product"
              : "Product resolved"}
          </MUI.Button>
        </MUI.Stack>
      </MUI.Stack>

      <MUI.Divider className="opacity-60 dark:border-neutral-200 border-neutral-700" />

      <MUI.Stack gap={2} mt={4}>
        <MUI.Typography variant="h4" className="dark:text-white font-bold">
          Seller Info
        </MUI.Typography>
        <MUI.Stack gap={1}>
          <MUI.Stack className="flex flex-row gap-2 items-center">
            <MUI.Avatar src={product.user.avatar.url} className="size-16" />
            <MUI.Typography variant="h5" className="dark:text-white">
              {product.user.username}
            </MUI.Typography>
            <MUI.Button
              variant="contained"
              className="bg-neutral-200 text-black dark:bg-neutral-800 normal-case ml-auto border-2 dark:text-white dark:border-neutral-600 border-neutral-400 border-solid"
              endIcon={<EmailIcon />}
            >
              Send Email
            </MUI.Button>
          </MUI.Stack>
          <MUI.Typography variant="h6" className="dark:text-neutral-300 my-3">
            Contact information
          </MUI.Typography>
          <MUI.Stack className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row sm:gap-4 gap-4 md:gap-4">
            <MUI.Stack className="dark:bg-neutral-800 bg-neutral-300 w-fit p-3 gap-1 rounded-md">
              <MUI.Stack className="flex flex-row gap-2 items-center">
                <EmailIcon className="dark:text-white" />
                <MUI.Typography variant="body1" className="dark:text-white">
                  Email
                </MUI.Typography>
              </MUI.Stack>
              <MUI.Typography variant="body2" className="dark:text-neutral-400">
                {product.user.email}
              </MUI.Typography>
            </MUI.Stack>
            <MUI.Stack className="dark:bg-neutral-800 bg-neutral-300 w-fit gap-1 p-3 rounded-md">
              <MUI.Stack className="flex flex-row gap-2 items-center">
                <PhoneIcon className="dark:text-white" />
                <MUI.Typography variant="body1" className="dark:text-white">
                  Phone Number
                </MUI.Typography>
              </MUI.Stack>
              <MUI.Typography variant="body2" className="dark:text-neutral-400">
                +234 123 456 7890
              </MUI.Typography>
            </MUI.Stack>
            <MUI.Stack className="dark:bg-neutral-800 bg-neutral-300 w-fit gap-1 p-3 rounded-md">
              <MUI.Stack className="flex flex-row gap-2 items-center">
                <LocationOnIcon className="dark:text-white" />
                <MUI.Typography variant="body1" className="dark:text-white">
                  Address
                </MUI.Typography>
              </MUI.Stack>
              <MUI.Typography variant="body2" className="dark:text-neutral-400">
                123, Fake Street, Lagos, Nigeria
              </MUI.Typography>
            </MUI.Stack>
          </MUI.Stack>
        </MUI.Stack>
      </MUI.Stack>
    </MUI.Stack>
  );
};

AdminProductViewDetails.propTypes = {
  product: PropTypes.object.isRequired,
};
