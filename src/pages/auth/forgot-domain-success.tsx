import CustomButton from '../../components/custom-button';
import ViewportContainer from '../../layouts/container';
import { Box, Stack, Image, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ForgotDomainSuccess = () => {
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
          <Image src={'/assets/images/mail.png'} />
        </Box>
        <Heading
          as={'h2'}
          fontSize='heading2'
          fontWeight='600'
          textAlign={'center'}
        >
          Check your email.
        </Heading>
        <Box textAlign='center'>
          <Text w={{ md: '60%' }} mx={'auto'}>
            The Company URL linked to the email you provided have been sent to
            you.
          </Text>
        </Box>
        <Box>
          <CustomButton
            onClick={() => {
              navigate('/');
            }}
          >
            Return to Homepage
          </CustomButton>
        </Box>
      </Stack>
    </ViewportContainer>
  );
};

export default ForgotDomainSuccess;
