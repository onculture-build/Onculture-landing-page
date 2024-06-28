import { Box } from '@chakra-ui/react';
import React from 'react';

interface IContainerProps {
  children: React.ReactNode;
}

const ViewPortContainer = ({ children }: IContainerProps) => {
  return (
    <Box
      w={{ base: '100%', lg: '90%' }}
      px={{ base: 4, sm: 8, lg: 10 }}
      maxW={'1440px'}
      mx={'auto'}
    >
      {children}
    </Box>
  );
};

export default ViewPortContainer;
