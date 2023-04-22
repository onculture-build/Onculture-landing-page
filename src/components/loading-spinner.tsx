import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <Oval
      height={20}
      width={20}
      color="#fff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#fff"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};

export default LoadingSpinner;
