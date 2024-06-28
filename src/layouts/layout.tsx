import { Stack } from '@chakra-ui/react';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

interface Props {
  children: React.ReactNode;
}

const LandingPageLayout = ({ children }: Props) => {
  return (
    <Stack minH={'100vh'} gap={0}>
      <Navbar />
      {children}
      <Footer />
    </Stack>
  );
};

export default LandingPageLayout;
