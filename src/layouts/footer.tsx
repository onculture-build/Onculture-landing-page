import {
  Box,
  Flex,
  Image,
  Grid,
  GridItem,
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SocialNetworks from '../lib/db/social-networks.json';
import { PageRoutes } from '../lib/constants';
import ViewPortContainer from './container';

const Footer = () => {
  return (
    <Box
      as='footer'
      bgColor={'brand.primary.600'}
      color={'brand.white'}
      bgImage={'url(/assets/images/dots.png)'}
      bgPosition={'center'}
      mt={'auto'}
    >
      <ViewPortContainer>
        <Grid
          py={{ base: 20, md: 28 }}
          px={{ base: '2rem', lg: '0' }}
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          justifyContent={'space-between'}
          gap={{ base: 20, md: 10 }}
        >
          <GridItem order={{ base: 3, lg: 1 }}>
            <Image src={'/assets/images/Onculture.png'} alt='onculture-logo' />
            <Flex direction={'column'}>
              <Text fontSize={'label'} mt={5}>
                Copyright &copy; {new Date().getFullYear()} OnCulture.
              </Text>
              <Text fontSize={'label'}>All rights reserved</Text>
            </Flex>
          </GridItem>
          <GridItem order={{ base: 1, lg: 2 }}>
            <Heading as={'h5'} fontSize={'heading5'}>
              Company
            </Heading>
            <Stack mt={5} gap={4}>
              <Link to={PageRoutes.home} style={{ fontSize: '1.5rem' }}>
                About ThePeoplePractice
              </Link>
              <Link to={PageRoutes.faq} style={{ fontSize: '1.5rem' }}>
                FAQ
              </Link>
            </Stack>
          </GridItem>
          <GridItem order={{ base: 2, lg: 3 }}>
            <Heading as={'h5'} fontSize={'heading5'}>
              Connect with us
            </Heading>
            <Stack mt={5} gap={4}>
              {SocialNetworks.map((network) => (
                <Link key={network.id} to={network.url!} target='blank'>
                  <Text>{network.type}</Text>
                </Link>
              ))}
            </Stack>
          </GridItem>
        </Grid>
      </ViewPortContainer>
    </Box>
  );
};

export default Footer;
