import "../../Styles/LandingSlider.css";
import PropTypes from "prop-types";

const Slide = ({ content }) => {
  return (
    <div className="slide-container">
      <div className="slide-content">
        {content?.map((slide, index) => (
          <div key={index} className="slide dark:border-white">
            <img src={slide.image} className="w-[150px]" alt="nope" />
            <h4 style={{ color: "rgba(0, 0, 0, 0.6)" }}>{slide.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

Slide.propTypes = {
  content: PropTypes.array.isRequired,
};

export default Slide;
