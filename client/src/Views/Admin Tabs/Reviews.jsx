import * as MUI from "@mui/material";
import AdminTableStructure from "../../Components/AdminTableStructure";
import AdminReviewsGridLayout from "../../Constants/Admin Grid Layouts/AdminReviewsGridLayout";

export default function Reviews() {
  const { reviewsHeaderGridRow } = AdminReviewsGridLayout();
  // const [selectedProducts, setSelectedProducts] = useState([]);
  return (
    <MUI.Box className="w-full">
      <MUI.Stack id="the container" className="w-full gap-10">
        <MUI.Stack className="flex flex-row justify-between items-center">
          <MUI.Typography variant="h4" className="dark:text-white">
            Products
          </MUI.Typography>
          <MUI.Button
            variant="contained"
            onClick={() => {
              console.log("Add Product");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Product
          </MUI.Button>
        </MUI.Stack>
        <MUI.Box id="products table">
          <AdminTableStructure
            rows={[
              {
                id: 1,
                preview:
                  "https://st3.depositphotos.com/1005404/13980/i/450/depositphotos_139809276-stock-photo-consumer-and-home-electronics.jpg",
                productName: {
                  name: "Product 1",
                  category: "Electronics",
                },
                reviewer: {
                  avatar: "",
                  name: "kilani",
                  email: "kilani@kilani.com",
                },
                rating: 3,
                review:
                  "This is a review for the product, it is good as it said in the of the productreview for the product, it is good as it said in the of the produc review for the product, it is good as it said in the of the product",
                dateReviewed: "2021-10-10",
              },
              {
                id: 2,
                preview:
                  "https://st3.depositphotos.com/1005404/13980/i/450/depositphotos_139809276-stock-photo-consumer-and-home-electronics.jpg",
                productName: {
                  name: "Product 1",
                  category: "Electronics",
                },
                reviewer: {
                  avatar: "",
                  name: "kilani",
                  email: "kilani@kilani.com",
                },
                stock: 6000,
                status: "Pending",
                rating: 3,
                review: "This is a review for the product",
                dateReviewed: "2021-10-10",
              },
            ]}
            columns={reviewsHeaderGridRow}
            // rowsSelected={selectedProducts}
            // setRowSelected={setSelectedProducts}
          />
        </MUI.Box>
      </MUI.Stack>
    </MUI.Box>
  );
}
