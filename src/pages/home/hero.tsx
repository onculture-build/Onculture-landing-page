import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import CustomButton from '../../components/custom-button';
import HeroVideo from '../../components/hero-video';
import ViewPortContainer from '../../layouts/container';
import { PageRoutes } from '../../lib/constants';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Flex
      backgroundAttachment={'fixed'}
      background={'url(/assets/images/home-hero-background.png)'}
      backgroundSize={'100% 100%'}
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'0px 40px'}
    >
      <ViewPortContainer>
        <Box my={28} px={{ base: '2rem', lg: '0' }}>
          <Stack
            h={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Stack w={'100%'} justifyContent={'center'} h={'100%'}>
              <Box
                h={'fit-content'}
                maxW={'550px'}
                mx={{ base: 'auto', lg: 0 }}
              >
                <Heading
                  as={'h1'}
                  fontSize={'heading1'}
                  textAlign={{ base: 'center', lg: 'left' }}
                >
                  Optimising teams through Culture
                </Heading>
                <Text
                  fontSize={'paragraph'}
                  w={{ lg: '70%' }}
                  textAlign={{ base: 'center', lg: 'left' }}
                  mt={10}
                >
                  OnCulture improves companies&apos; culture by driving
                  performance and synergy through learning, process automation
                  and community.
                </Text>
                <Box
                  w={'40%'}
                  my={{ base: 20, lg: 14 }}
                  mx={{ base: 'auto', lg: 0 }}
                >
                  <CustomButton
                    onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
                    w={'100%'}
                  >
                    Book a Demo
                  </CustomButton>
                </Box>
              </Box>
            </Stack>
            <Box w={'100%'}>
              <HeroVideo />
            </Box>
          </Stack>
        </Box>
      </ViewPortContainer>
    </Flex>
  );
};

export default Hero;
