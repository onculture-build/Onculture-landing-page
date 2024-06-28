import React from 'react';
import { Oval } from 'react-loader-spinner';

interface LoadingProps {
  h?: number;
  w?: number;
  color?: string;
}

const LoadingSpinner = ({
  h = 30,
  w = 30,
  color = 'rgba(92, 0, 221, 1)',
}: LoadingProps) => {
  return (
    <Oval
      height={h}
      width={w}
      color={color}
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor='#fff'
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};

export default LoadingSpinner;
