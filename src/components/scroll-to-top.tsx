import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IScrollToTop {
  children: ReactNode;
}

const ScrollToTop = ({ children }: IScrollToTop) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
