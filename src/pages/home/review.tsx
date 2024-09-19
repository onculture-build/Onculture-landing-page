import ImageSlider from '../../components/ImageSlider';
import ViewportContainer from '../../layouts/container';
import reviewData from '../../lib/db/reviews.json';
import { Box } from '@chakra-ui/react';

const Review = () => {
  return (
    <Box w={'100%'} bgColor={'brand.gray.600'}>
      <ViewportContainer>
        <ImageSlider images={reviewData} />
      </ViewportContainer>
    </Box>
  );
};

export default Review;
