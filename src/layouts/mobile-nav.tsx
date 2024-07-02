import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navLinks } from './navlinks';
import { MdMenu } from 'react-icons/md';
import CustomButton from '../components/custom-button';
import { PageRoutes } from '../lib/constants';

const MobileNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  return (
    <>
      <IconButton
        icon={<MdMenu />}
        fontSize={32}
        color={'brand.primary.500'}
        cursor={'pointer'}
        onClick={onOpen}
        aria-label='menu'
        variant={'unstyled'}
        hideFrom={'900px'}
      />
      <Drawer isOpen={isOpen} placement='right' size={'md'} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent p={10} hideFrom={'900px'}>
          <Flex alignItems={'center'}>
            <Box>
              <Image
                src={'/assets/images/Onculture-colored.png'}
                alt='OnCulture'
                w={'70%'}
              />
            </Box>
            <DrawerCloseButton
              size={'2xl'}
              padding={6}
              color='brand.primary.600'
            />
          </Flex>
          <Stack>
            <Flex as={'ul'} direction={'column'} gap={8} mt={28}>
              {navLinks.map((link) => (
                <NavLink key={link.id} to={link.href} onClick={onClose}>
                  <Text fontSize={'heading5'} fontWeight={'semiBold'}>
                    {link.label}
                  </Text>
                </NavLink>
              ))}
            </Flex>
            <Flex gap={4} direction={'column'} mt={16} w={'80%'}>
              <CustomButton
                variant='outline'
                fontSize={'paragraph'}
                fontWeight={'medium'}
                padding={'2rem'}
                w={'100%'}
                onClick={() => {
                  navigate(`/${PageRoutes.joinWaitlist}`);
                  onClose();
                }}
              >
                Join Waitlist
              </CustomButton>
              <CustomButton
                fontSize={'paragraph'}
                fontWeight={'medium'}
                padding={'2rem 3rem'}
                w={'100%'}
                onClick={() => {
                  navigate(`/${PageRoutes.bookDemo}`);
                  onClose();
                }}
              >
                Book a Demo
              </CustomButton>
            </Flex>
          </Stack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
