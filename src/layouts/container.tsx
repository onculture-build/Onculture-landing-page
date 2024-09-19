import { Box } from '@chakra-ui/react';
import React from 'react';

interface IContainerProps {
  children: React.ReactNode;
}

const ViewportContainer = ({ children }: IContainerProps) => {
  return (
    <Box w={'100%'} px={{ base: 4, sm: 8, lg: 10 }} maxW={'1440px'} mx={'auto'}>
      {children}
    </Box>
  );
};

export default ViewportContainer;
