import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import ViewPortContainer from '../../layouts/container';

const Companies = () => {
  return (
    <ViewPortContainer>
      <Stack
        px={10}
        py={40}
        alignItems={'center'}
        justifyContent={'center'}
        gap={28}
      >
        <Heading as={'h3'} fontSize={'heading3'} textAlign={'center'}>
          You're in Good Company
        </Heading>
        <Flex flexWrap={'wrap'} justifyContent={'center'} gap={20}>
          <Box w={'fit-content'}>
            <Image
              src={'/assets/images/Afycare.png'}
              alt='onculture-afyacare'
            />
          </Box>
          <Box w={'fit-content'}>
            <Image
              src={'/assets/images/earnipay.png'}
              alt='onculture-earnipay'
            />
          </Box>
          <Box w={'fit-content'}>
            <Image src={'/assets/images/purple.png'} alt='onculture-purple' />
          </Box>
          <Box w={'fit-content'}>
            <Image
              src={'/assets/images/euphoria-img.png'}
              alt='onculture-euphoria'
            />
          </Box>
        </Flex>
      </Stack>
    </ViewPortContainer>
  );
};

export default Companies;
