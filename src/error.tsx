import { Image, Box, Text, Heading, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomButton from './components/custom-button';

const ErrorFallback = ({ error }: { error?: Error }) => {
  const navigate = useNavigate();
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      gap={10}
      className='page'
      h={'100vh'}
    >
      <Box>
        <Image src={'/assets/svg/coffetable.svg'} />
      </Box>
      <Box textAlign={'center'}>
        <Heading as={'h1'} fontSize='heading1' fontWeight='600'>
          Oops!
        </Heading>
        <Text>Sorry something went wrong but we are fixing it ⚙️ 🛠</Text>
      </Box>
      <Box mt={10}>
        <CustomButton onClick={() => window.history.back()}>
          Return to previous page
        </CustomButton>
      </Box>
    </Stack>
  );
};

export default ErrorFallback;
