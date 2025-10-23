import ViewportContainer from '../../layouts/container';
import CustomButton from '../../components/custom-button';
import { Box, Stack, Img, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignupFailure = () => {
  const navigate = useNavigate();
  return (
    <ViewportContainer>
      <Stack
        justifyContent='center'
        alignContent='center'
        alignSelf='center'
        alignItems='center'
        gap='10'
        maxW={{ base: '100%', md: '70%', xl: '50%' }}
        mx={'auto'}
        py={40}
      >
        <Box>
          <Img src={'/assets/images/checkmark.png'} />
        </Box>
        <Heading
          as={'h2'}
          fontSize='heading2'
          fontWeight='600'
          textAlign={'center'}
        >
          Added to Waitlist
        </Heading>
        <Box textAlign='center'>
          <Text>Thank you for signing up to OnCulture.</Text>
          <Text>
            Unfortunately, we're not open for use just yet. But Good News!
            You've been added to our VIP waitlist! 🚦 You'll be the first to
            know when OnCulture is ready for prime time. We can't wait to share
            the full experience with you.
          </Text>
        </Box>
        <CustomButton
          w={'70%'}
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Homepage
        </CustomButton>
      </Stack>
    </ViewportContainer>
  );
};

export default SignupFailure;
