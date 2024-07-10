import { Box, Flex, Image, Show, Text } from '@chakra-ui/react';
import { navLinks } from './navlinks';
import { NavLink, useNavigate } from 'react-router-dom';
import MobileNavigation from './mobile-nav';
import ViewPortContainer from './container';
import { PageRoutes } from '../lib/constants';
import CustomButton from '../components/custom-button';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex as={'nav'}>
      <ViewPortContainer>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          py={{ base: 6, lg: 10 }}
          px={{ base: '2rem', lg: '0' }}
        >
          <Box>
            <Image
              src='/assets/images/Onculture-logo.png'
              alt='OnCulture'
              onClick={() => navigate(PageRoutes.home)}
              cursor={'pointer'}
              w={'145px'}
              h={'30px'}
            />
          </Box>
          <Flex as={'ul'} gap={28} hideBelow={'1000px'}>
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.href}
                end
                style={({ isActive }) =>
                  isActive ? { color: 'rgba(92, 0, 221, 1)' } : {}
                }
              >
                <Text
                  fontSize={'label'}
                  fontWeight={'semiBold'}
                  _hover={{ color: 'brand.primary.600' }}
                >
                  {link.label}
                </Text>
              </NavLink>
            ))}
          </Flex>
          <Flex gap={5} hideBelow={'900px'}>
            <CustomButton
              variant='outline'
              fontSize={'small'}
              fontWeight={'medium'}
              padding={'1.5rem 3rem'}
              w={'100%'}
              onClick={() => navigate(`/${PageRoutes.joinWaitlist}`)}
            >
              Join Waitlist
            </CustomButton>
            <CustomButton
              fontSize={'small'}
              fontWeight={'medium'}
              padding={'1.5rem 3rem'}
              w={'100%'}
              onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
            >
              Book a Demo
            </CustomButton>
          </Flex>
          <Show breakpoint='(max-width: 900px)'>
            <MobileNavigation />
          </Show>
        </Flex>
      </ViewPortContainer>
    </Flex>
  );
};

export default Navbar;
