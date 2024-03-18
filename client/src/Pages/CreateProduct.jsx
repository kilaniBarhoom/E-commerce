import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import * as MUI from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosCredintialsCookie";
import MainDetails from "../Components/Create-product-components/MainDetails";
import Pricing from "../Components/Create-product-components/Pricing";
import Properties from "../Components/Create-product-components/Properties";

export default function CreateProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: 0,
    quantity: 0,
    salePrice: 0,
    tax: 0,
    status: "Pending",
    images: [],
  });
  const [draftButtondisabled, setDraftButtonDisabled] = useState(true);
  // const [loadingToCreateProduct, setLoadingToCreateProduct] = useState(false);
  const nav = useNavigate();

  const updateProductData = (field, value) => {
    console.log(productData);
    setProductData({ ...productData, [field]: value });
    if (value) {
      setDraftButtonDisabled(false);
    } else {
      setDraftButtonDisabled(true);
    }
  };

  const createProduct = async (data) => {
    // setLoadingToCreateProduct(true);
    try {
      const res = await axios.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        console.log(res.data);
        nav(-1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setLoadingToCreateProduct(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in productData) {
      if (key === "images") {
        for (let i = 0; i < productData.images.length; i++) {
          formData.append("images", productData.images[i]);
        }
        continue;
      }
      formData.append(key, productData[key]);
    }
    createProduct(formData);
  };

  const saveProductToDrafts = () => {
    localStorage.setItem("productDraft", JSON.stringify(productData));
    nav(-1);
  };

  return (
    <MUI.Stack className="gap-10 w-full py-5 px-1 pb-20 h-full">
      <MUI.Typography variant="h4" className="dark:text-white font-bold">
        Create a new product
      </MUI.Typography>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <MainDetails updateProductData={updateProductData} />
        <Properties updateProductData={updateProductData} />
        <Pricing updateProductData={updateProductData} />
        <MUI.Box className="ml-auto flex flex-row gap-4 w-fit my-5">
          <MUI.Button
            variant="contained"
            size="large"
            startIcon={<FolderCopyIcon />}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 disabled:opacity-45 rounded-md"
            onClick={saveProductToDrafts}
            disabled={draftButtondisabled}
          >
            Save Draft
          </MUI.Button>
          <MUI.Button
            type="submit"
            variant="contained"
            size="large"
            className="capitalize bg-blue-500"
          >
            Create Product
          </MUI.Button>
        </MUI.Box>
      </form>
    </MUI.Stack>
  );
}
