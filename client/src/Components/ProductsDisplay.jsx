import "../Styles/LandingProducts.css";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductsDisplay = ({ productContent }) => {
  return (
    <div className="landing-products-container">
      <div className="landing-products-content">
        {productContent?.map((slide, index) => (
          <ProductCard key={index} content={slide} />
        ))}
      </div>
    </div>
  );
};

ProductsDisplay.propTypes = {
  productContent: PropTypes.array.isRequired,
};

export default ProductsDisplay;
