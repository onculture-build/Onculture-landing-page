import React from "react";
import { boxData } from "../../constants/data";
import Box from "../../components/Box";
import carouselStyle from "../../styles/Home/Carousel.module.css";
// import lineSvg from "../../Assets/Images/line2.svg";

const Carousel = () => {
  return (
    <div className={carouselStyle.main}>
      <div className={carouselStyle.content}>
        <h3>Benefits of OnCulture</h3>
        {/* <p className={carouselStyle.pText}>
          We help you shape the shared behaviours of your entire company, while
          promoting practices.
        </p>
        <p>Benefits are:</p> */}
        <div className={carouselStyle.gridContainer}>
          {boxData.map((data, index) => (
            <Box key={index} data={data} />
          ))}
        </div>
        {/* <div className={carouselStyle.bgObjectline}>
          <img src={lineSvg} alt="onculture line" />
        </div> */}
        <div className={carouselStyle.bgBlurObject}></div>
      </div>
    </div>
  );
};

export default Carousel;
