import PropTypes from "prop-types";
import axios from "../AxiosCredintialsCookie";

export const GetAllReviews = ({ setLoadingToGetReviews, setReviews }) => {
  async function getAllReviews() {
    try {
      const response = await axios.get("/reviews");
      if (response.status === 200) {
        console.log("response.data.reviews: ", response.data.reviews);
        const reviewsFetched = response.data.reviews;
        console.log("reviewsFetched: ", reviewsFetched);
        reviewsFetched.map((review) => {
          review.id = review._id;
          review.reviewer = review.user;
          review.preview = review.product.images[0].url;
          review.date = review.createdAt;
          review.productName = review.product.name;
        });
        setReviews(reviewsFetched);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingToGetReviews(false);
    }
  }
  return {
    getAllReviews,
  };
};

GetAllReviews.propTypes = {
  setLoadingToGetReviews: PropTypes.func.isRequired,
  setReviews: PropTypes.func.isRequired,
};
