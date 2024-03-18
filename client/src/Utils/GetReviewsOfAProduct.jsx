import axios from "../AxiosCredintialsCookie";
import PropTypes from "prop-types";

export const GetReviewsOfAProduct = ({ productId }) => {
  const getReviewsOfAProduct = async () => {
    try {
      const response = await axios.get(`/reviews/${productId}`);
      return response?.data?.reviews;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getReviewsOfAProduct,
  };
};

GetReviewsOfAProduct.propTypes = {
  productId: PropTypes.string.isRequired,
};
