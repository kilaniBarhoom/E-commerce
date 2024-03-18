import axios from "../AxiosCredintialsCookie";
import PropTypes from "prop-types";

export const GetAllProducts = ({ setLoadingToGetProducts, setProducts }) => {
  async function getAllProducts() {
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
          product.rating = product.reviews.reduce(
            (acc, item) => acc + item.rating,
            0
          );
        });
        setProducts(products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingToGetProducts(false);
    }
  }
  return {
    getAllProducts,
  };
};

GetAllProducts.propTypes = {
  setLoadingToGetProducts: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
};
