import ImageSlider from '../../components/ImageSlider';
import ViewPortContainer from '../../layouts/container';
import reviewData from '../../lib/db/reviews.json';
import { Box } from '@chakra-ui/react';

const Review = () => {
  return (
    <Box w={'100%'} bgColor={'brand.gray.600'}>
      <ViewPortContainer>
        <ImageSlider images={reviewData} />
      </ViewPortContainer>
    </Box>
  );
};

export default Review;
