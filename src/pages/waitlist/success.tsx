import { Box, Flex, Heading, Text, Stack, Image } from '@chakra-ui/react';
import ViewportContainer from '../../layouts/container';
import { FaCircleCheck } from 'react-icons/fa6';
import SocialNetworks from '../../lib/db/social-networks.json';
import { Link } from 'react-router-dom';
import '../template/template.css';

const WaitlistSuccess = () => {
  return (
    <Box
      bgImage={'url(/assets/svg/line.svg)'}
      bgRepeat={'no-repeat'}
      position={'relative'}
      backgroundPosition={'-100px 200px'}
      bgSize={'contain'}
      className='page'
    >
      <ViewportContainer>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          my={'20vh'}
          gap={12}
        >
          <Flex
            bgImage={'url(/assets/images/success-confetti.png)'}
            bgSize={'cover'}
            bgPosition={'center'}
            bgRepeat={'no-repeat'}
            color={'brand.primary.600'}
            p={24}
          >
            <FaCircleCheck fontSize={'64px'} />
          </Flex>
          <Stack textAlign={'center'}>
            <Heading as={'h3'} fontSize={'heading3'}>
              Successful!
            </Heading>
            <Text maxW={{ base: '100%', md: '70%' }} mx={'auto'}>
              Thank you for joining our waitlist! We're thrilled to see your
              interest and can't wait to bring our product to you. We're working
              hard to make it available as soon as possible.
            </Text>
          </Stack>
          <Stack alignItems={'center'} gap={8}>
            <Heading as={'h5'} fontSize={'heading5'}>
              Follow us
            </Heading>
            <Flex gap={5}>
              {SocialNetworks.slice(1).map((sm) => (
                <Link key={sm.id} to={sm.url} target='_blank'>
                  <Image src={sm.icon} alt={sm.type} />
                </Link>
              ))}
            </Flex>
          </Stack>
        </Stack>
      </ViewportContainer>
    </Box>
  );
};

export default WaitlistSuccess;
