import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { LinearProgress } from "@mui/joy";
import * as MUI from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminProductViewDetails } from "../Components/AdminProductViewDetails";
import AdminProductViewTabs from "../Components/AdminProductViewTabs";
import { useProduct } from "../Hooks/useProduct";
import { GetReviewsOfAProduct } from "../Utils/GetReviewsOfAProduct";

const AdminProductView = () => {
  const { productId } = useParams();
  const [loadingToGetProduct, setLoadingToGetProduct] = useState(true);
  const { productFetched } = useProduct({ setLoadingToGetProduct, productId });
  const [productImages, setProductImages] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (productFetched?.images?.length > 0) {
      setProductImages(productFetched.images);
      setProductImage(productFetched.images[0].url);
    }

    const { getReviewsOfAProduct } = GetReviewsOfAProduct({ productId });
    const fetchReviews = async () => {
      const reviews = await getReviewsOfAProduct();
      setReviews(reviews);
    };
    fetchReviews();
  }, [productFetched]);
  return (
    <MUI.Box className="h-fit p-3">
      <MUI.Typography variant="h3" className="dark:text-white">
        Admin Product View
      </MUI.Typography>
      {loadingToGetProduct ? (
        <LinearProgress variant="solid" size="sm" />
      ) : (
        <MUI.Stack className="gap-5">
          <MUI.Stack className="flex flex-col sm:flex-row gap-5 flex-wrap">
            <MUI.Box className="bg-white flex-1 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-4/5 sm:scale-50 shadow-md">
              <MUI.Box
                className="dark:border-2 max-w-[700px] rounded-md mx-auto relative group"
                id="picture-view"
              >
                <img
                  className="object-contain rounded-md w-full max-w-full sm:max-w-[700px] sm:h-[700px] mx-auto"
                  src={productImage}
                  alt=""
                />
                <MUI.IconButton
                  onClick={() => {
                    let index = productImages.findIndex(
                      (image) => image.url == productImage
                    );
                    if (index > 0) {
                      setProductImage(productImages[index - 1].url);
                    } else {
                      setProductImage(
                        productImages[productImages.length - 1].url
                      );
                    }
                  }}
                  size="large"
                  className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 sm:-translate-y-1/2 translate-x-[-50%] dark:bg-opacity-65 dark:bg-neutral-300 group-hover:bg-opacity-100"
                >
                  <KeyboardArrowLeftIcon fontSize="large" />
                </MUI.IconButton>
                <MUI.IconButton
                  onClick={() => {
                    let index = productImages.findIndex(
                      (image) => image.url == productImage
                    );
                    if (index < productImages.length - 1) {
                      setProductImage(productImages[index + 1].url);
                    } else {
                      setProductImage(productImages[0].url);
                    }
                  }}
                  size="large"
                  className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 sm:-translate-y-1/2 translate-x-[-50%] dark:bg-opacity-65 dark:bg-neutral-300 group-hover:bg-opacity-100"
                >
                  <KeyboardArrowRightIcon fontSize="large" />
                </MUI.IconButton>
              </MUI.Box>
              <MUI.Stack className="flex flex-row gap-2 p-5" id="pictures">
                {productImages?.map((image) => (
                  <MUI.Box
                    key={image.public_id}
                    onClick={() => setProductImage(image.url)}
                    className="cursor-pointer rounded-md shadow-md border-transparent border-2"
                  >
                    <img
                      width={100}
                      className="object-contain rounded-md cursor-pointer border-transparent border-2"
                      src={image.url}
                      alt=""
                    />
                  </MUI.Box>
                ))}
              </MUI.Stack>
            </MUI.Box>
            <MUI.Box flex={1}>
              <AdminProductViewDetails product={productFetched} />
            </MUI.Box>
          </MUI.Stack>
          <MUI.Stack
            className="gap-2 mt-5 w-full md:w-2/3"
            id="Customer Reviews container"
          >
            <MUI.Typography variant="h3" className="dark:text-white">
              Customer Reviews
            </MUI.Typography>
            <MUI.Box className="px-3 py-10 border-solid border-transparent border-b-2 border-b-neutral-700 gap-2">
              {reviews?.length > 0 ? (
                <MUI.Stack className="gap-3">
                  <MUI.Stack className="mx-auto flex flex-col items-center justify-center">
                    <MUI.Typography variant="h3" className="dark:text-white">
                      {reviews.reduce((acc, review) => acc + review.rating, 0) /
                        reviews.length}
                    </MUI.Typography>
                    <MUI.Stack className="flex flex-row gap-2  items-center">
                      <StyledRating
                        size="large"
                        readOnly
                        value={
                          reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                          ) / reviews.length
                        }
                      />
                      <MUI.Typography
                        variant="subtitle2"
                        className="dark:text-white"
                      >
                        ({reviews.length} Reviews)
                      </MUI.Typography>
                    </MUI.Stack>
                  </MUI.Stack>
                  <MUI.Stack gap={2} id="stars average of 5">
                    <MUI.Stack className="flex flex-row items-center  justify-center gap-5 w-full">
                      <MUI.Typography variant="h6" className="dark:text-white">
                        5 Star
                      </MUI.Typography>
                      <MUI.Box className="w-2/4">
                        <LinearProgress
                          determinate
                          value={80}
                          thickness={5}
                          className="text-green-700"
                        />
                      </MUI.Box>
                    </MUI.Stack>
                    <MUI.Stack className="flex flex-row items-center  justify-center gap-5 w-full">
                      <MUI.Typography variant="h6" className="dark:text-white">
                        4 Star
                      </MUI.Typography>
                      <MUI.Box className="w-2/4">
                        <LinearProgress
                          determinate
                          value={60}
                          thickness={5}
                          className="text-green-500"
                        />
                      </MUI.Box>
                    </MUI.Stack>
                    <MUI.Stack className="flex flex-row items-center  justify-center gap-5 w-full">
                      <MUI.Typography variant="h6" className="dark:text-white">
                        3 Star
                      </MUI.Typography>
                      <MUI.Box className="w-2/4">
                        <LinearProgress
                          determinate
                          value={40}
                          thickness={5}
                          className="text-yellow-600"
                        />
                      </MUI.Box>
                    </MUI.Stack>
                    <MUI.Stack className="flex flex-row items-center  justify-center gap-5 w-full">
                      <MUI.Typography variant="h6" className="dark:text-white">
                        2 Star
                      </MUI.Typography>
                      <MUI.Box className="w-2/4">
                        <LinearProgress
                          determinate
                          value={20}
                          thickness={5}
                          className="text-orange-500"
                        />
                      </MUI.Box>
                    </MUI.Stack>
                    <MUI.Stack className="flex flex-row items-center  justify-center gap-5 w-full">
                      <MUI.Typography variant="h6" className="dark:text-white">
                        1 Star
                      </MUI.Typography>
                      <MUI.Box className="w-2/4">
                        <LinearProgress
                          determinate
                          value={5}
                          thickness={5}
                          className="text-red-500"
                        />
                      </MUI.Box>
                    </MUI.Stack>
                  </MUI.Stack>
                  <AdminProductViewTabs reviews={reviews} />
                </MUI.Stack>
              ) : (
                <MUI.Typography variant="h5" className="dark:text-white">
                  {" "}
                  No Reviews Yet
                </MUI.Typography>
              )}
            </MUI.Box>
          </MUI.Stack>
        </MUI.Stack>
      )}
    </MUI.Box>
  );
};

export default AdminProductView;

const isDarkMode = () => {
  // Replace 'dark' with the actual dark mode class from Tailwind CSS
  return document.documentElement.classList.contains("dark");
};

const StyledRating = MUI.styled(MUI.Rating)(() => ({
  // Add your custom styles here
  // Example for handling dark background
  color: isDarkMode() ? "#fff" : "#000",
  "& .MuiRating-iconFilled": {
    color: isDarkMode() ? "#fff" : "#f57c00", // Adjust the filled star color
  },
  "& .MuiRating-iconEmpty": {
    color: isDarkMode() ? "#616161" : "#bdbdbd", // Adjust the empty star color
  },
}));
