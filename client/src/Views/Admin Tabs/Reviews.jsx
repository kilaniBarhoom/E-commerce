import * as MUI from "@mui/material";
import AdminTableStructure from "../../Components/AdminTableStructure";
import AdminReviewsGridLayout from "../../Constants/Admin Grid Layouts/AdminReviewsGridLayout";
import { useEffect, useState } from "react";
import { GetAllReviews } from "../../Utils/GetAllReviews";

export default function Reviews() {
  const { reviewsHeaderGridRow } = AdminReviewsGridLayout();
  const [reviews, setReviews] = useState([]);
  const [loadingToGetReviews, setLoadingToGetReviews] = useState(true);

  const { getAllReviews } = GetAllReviews({
    setLoadingToGetReviews,
    setReviews,
  });
  useEffect(() => {
    getAllReviews();
    console.log("reviews2: ", reviews);
  }, []);
  useEffect(() => {
    console.log("reviews: ", reviews);
  }, [reviews]);

  return (
    <MUI.Box className="w-full">
      {loadingToGetReviews ? (
        <MUI.Box className="w-full">
          <MUI.LinearProgress variant="solid" size="sm" />
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
                Reviews
              </MUI.Typography>
              <span className="p-1 px-[10px]  rounded-lg bg-blue-500 text-white">
                {reviews?.length}
              </span>
            </MUI.Stack>
          </MUI.Stack>
          <MUI.Box id="reviews table" className="dataGridContainer">
            <AdminTableStructure rows={reviews} column={reviewsHeaderGridRow} />
          </MUI.Box>
        </MUI.Stack>
      )}
    </MUI.Box>
  );
}
