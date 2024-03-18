import "../Styles/LandingProducts.css";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductsDisplay = ({ products }) => {
  return (
    <div className="landing-products-container">
      <div className="landing-products-content">
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

ProductsDisplay.propTypes = {
  productContent: PropTypes.array.isRequired,
};

ProductsDisplay.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsDisplay;
