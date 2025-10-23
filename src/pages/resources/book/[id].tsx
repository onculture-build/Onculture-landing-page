import { Link, useParams } from 'react-router-dom';
import ApiBooks from '../../../lib/db/books.json';
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import CustomButton from '../../../components/custom-button';
import ViewportContainer from '../../../layouts/container';
import ErrorPage from '../../ErrorPage';

const SingleBook = () => {
  const { id } = useParams();

  const content = ApiBooks.find((book) => book.id === id);

  return content ? (
    <ViewportContainer>
      <Stack my={20} gap={20} px={{ base: '2rem', lg: '0' }}>
        <Link to={'/resources'}>
          <CustomButton>Back to all resources</CustomButton>
        </Link>
        <Heading as={'h2'} fontSize={'heading2'}>
          {content.title}
        </Heading>
        <Box>
          <Image src={content.image} w={'100%'} />
        </Box>
        <Text fontSize={{ md: 'heading5' }}>{content.content}</Text>
        <Box mt={20}>
          <CustomButton>Download</CustomButton>
        </Box>
      </Stack>
    </ViewportContainer>
  ) : (
    <ErrorPage errorTitle='Cannot find requested resource' />
  );
};

export default SingleBook;
