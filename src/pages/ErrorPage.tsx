import React from 'react';
import { Box, Flex, Heading, Img, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ViewPortContainer from '@@/layout/container';
import CustomButton from '@@/components/custom-button';

type ErrorPageProp = {
  errorText?: string;
  errorTitle?: string;
};
const ErrorPage = ({ errorText, errorTitle }: ErrorPageProp) => {
  const navigate = useNavigate();
  return (
    <ViewPortContainer>
      <Stack
        justifyContent='center'
        alignContent='center'
        alignSelf='center'
        alignItems='center'
        gap='10'
        py={40}
      >
        <Box>
          <Img src={'/assets/svg/coffetable.svg'} />
        </Box>
        <Heading
          as={'h2'}
          fontSize='heading2'
          fontWeight='600'
          textAlign={'center'}
        >
          {errorTitle || 'Page not Found!'}
        </Heading>
        <Box textAlign='center'>
          <Text>{errorText}</Text>
        </Box>
        <Box>
          <CustomButton
            onClick={() => {
              navigate('/');
            }}
          >
            Go to Home Page
          </CustomButton>
        </Box>
      </Stack>
    </ViewPortContainer>
  );
};

export default ErrorPage;
