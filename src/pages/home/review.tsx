import React from 'react';
import ImageSlider from '@@/components/ImageSlider';
import reviewData from '@@lib/db/reviews.json';
import { Box } from '@chakra-ui/react';
import ViewPortContainer from '@@/layout/container';

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
