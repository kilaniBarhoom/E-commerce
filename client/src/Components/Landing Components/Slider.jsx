import React, { useState } from "react";
import "../../Styles/LandingSlider.css";

const Slide = ({ content }) => {
  return (
    <div className="slide-container">
      <div className="slide-content">
        {content.map((slide, index) => (
          <div key={index} className="slide">
            <img width={150} src={slide.image} alt="nope" />
            <h4 style={{ color: "rgba(0, 0, 0, 0.6)" }}>{slide.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
