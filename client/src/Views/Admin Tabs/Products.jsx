import AddIcon from "@mui/icons-material/Add";
import { LinearProgress } from "@mui/joy";
import * as MUI from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTableStructure from "../../Components/AdminTableStructure";
import AdminProductsGridLayout from "../../Constants/Admin Grid Layouts/AdminProductsGridLayout";
import { GetAllProducts } from "../../Utils/GetAllProducts";
export default function Products() {
  const { productsHeaderGridRow } = AdminProductsGridLayout();
  const [products, setProducts] = useState([]);
  const [loadingToGetProducts, setLoadingToGetProducts] = useState(true);
  const nav = useNavigate();
  const { getAllProducts } = GetAllProducts({
    setLoadingToGetProducts,
    setProducts,
  });
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <MUI.Box className="w-full flex flex-row h-full items-center justify-center">
      {loadingToGetProducts ? (
        <MUI.Box className="w-[50%]">
          <LinearProgress variant="solid" size="sm" />
        </MUI.Box>
      ) : (
        <MUI.Stack id="the container" className="w-full h-full gap-5">
          <MUI.Stack className="flex flex-row justify-between items-center">
            <MUI.Stack
              direction="row"
              className="gap-2 flex flex-row items-center"
              gap={2}
            >
              <MUI.Typography
                variant="h4"
                className="dark:text-white font-extrabold"
              >
                Products
              </MUI.Typography>
              <span className="p-1 px-[10px]  rounded-lg bg-blue-500 text-white">
                {products.length}
              </span>
            </MUI.Stack>

            <MUI.Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => {
                nav("/products/create");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Add Product
            </MUI.Button>
          </MUI.Stack>
          <MUI.Box id="products table" className="dataGridContainer">
            <AdminTableStructure
              rows={products}
              columns={productsHeaderGridRow}
              // rowsSelected={selectedProducts}
              // setRowSelected={setSelectedProducts}
            />
          </MUI.Box>
        </MUI.Stack>
      )}
    </MUI.Box>
  );
}
