import React from "react";
import { ColorRing } from "react-loader-spinner";

const LoadingState = () => {
  return (
    <>
      <div>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#5C00DD", "#8790A3", "#000000", "ffffff", "#5C00DD"]}
        />
      </div>
    </>
  );
};

export default LoadingState;
