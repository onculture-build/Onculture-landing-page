import { Box, Image, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import './loading.css';

const OncultureLoader = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      <Box className='loading-container'>
        <Image src='/assets/images/Onculture-colored.png' />
      </Box>
    </Flex>
  );
};

export default OncultureLoader;
