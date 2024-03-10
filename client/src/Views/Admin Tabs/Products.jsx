import AddIcon from "@mui/icons-material/Add";
import { LinearProgress } from "@mui/joy";
import * as MUI from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../AxiosCredintialsCookie";
import AdminTableStructure from "../../Components/AdminTableStructure";
import AdminProductsGridLayout from "../../Constants/Admin Grid Layouts/AdminProductsGridLayout";
export default function Products() {
  const { productsHeaderGridRow } = AdminProductsGridLayout();
  const [rows, setRows] = useState([]);
  const [loadingToGetProducts, setLoadingToGetProducts] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("/products");
        if (response.status === 200) {
          let products = response.data.products;
          products.forEach((product) => {
            product.id = product._id;
            product.seller = product.user;
            product.seller.avatar = product.user.avatar.url;
            product.seller.name = product.user.username;
            product.seller.email = product.user.email;
            product.preview = product.images[0].url;
            product.rating = 0;
          });
          setRows(products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingToGetProducts(false);
      }
    }
    getProducts();
  }, []);
  return (
    <MUI.Box className="w-full flex flex-row h-full items-center justify-center">
      {loadingToGetProducts ? (
        <MUI.Box className="w-[50%]">
          <LinearProgress variant="solid" size="sm" />
        </MUI.Box>
      ) : (
        <MUI.Stack id="the container" className="w-full h-fit gap-5">
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
                {rows.length}
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
          <MUI.Box id="products table">
            <AdminTableStructure
              rows={
                rows || [
                  {
                    id: "1",
                    preview: "https://via.placeholder.com/150",
                    name: "Product Name",
                    seller: {
                      avatar: "https://via.placeholder.com/150",
                      name: "Seller Name",
                      email: "Seller Email",
                    },
                    price: 10,
                    stock: 10,
                    status: "Pending",
                    rating: 2,
                  },
                ]
              }
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
