import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import './loading.css';

const Loading = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      margin='20% auto'
      padding='0'
      gap='1rem'
    >
      <Box className={'loader'}></Box>
      <Text fontSize='14px' fontWeight='400'>
        Holding the door for you ...
      </Text>
    </Flex>
  );
};

export default Loading;
