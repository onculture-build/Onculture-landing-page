import { Box, Divider, Flex, Image, Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import ViewportContainer from '../container';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      h={'100vh'}
      gap={0}
      overflowX={'hidden'}
      overflowY={'auto'}
      className='page'
    >
      <Box
        bg={'brand.white'}
        position={'sticky'}
        style={{ position: '-webkit-sticky' }}
        top={0}
        zIndex={1000}
      >
        <ViewportContainer>
          <Flex py={10} px={{ base: '2rem', lg: '0' }}>
            <Link to={'/'}>
              <Image src={'/assets/images/Onculture-colored.png'} w={'60%'} />
            </Link>
          </Flex>
        </ViewportContainer>
        <Divider colorScheme='brand.primary' />
      </Box>
      <Box>
        <ViewportContainer>
          <Stack>{children}</Stack>
        </ViewportContainer>
      </Box>
    </Stack>
  );
};

export default AuthLayout;
