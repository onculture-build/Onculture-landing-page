import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import ViewPortContainer from '../layouts/container';

type ImageSliderProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
};

interface SliderData {
  images: ImageSliderProps[];
}

const ImageSlider = ({ images }: SliderData) => {
  const calloutStylesBefore = {
    content: '""',
    position: 'absolute',
    height: '2rem',
    width: '2rem',
    backgroundColor: 'brand.white',
    left: '50%',
    bottom: '-1rem',
    transform: 'rotate(45deg)',
  };

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 2,
    lazyLoad: true,
    autoplay: true,
    autoPlaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      bgImage={'url(/assets/images/quote.png)'}
      bgPosition={'right 2rem'}
      bgRepeat={'no-repeat'}
      py={40}
      px={10}
    >
      <ViewPortContainer>
        <Box maxW={{ md: '90%' }} mx={'auto'} my={'5vh'}>
          <Slider {...settings}>
            {images.map((item) => (
              <Box key={item.id}>
                <Box px={{ base: 2, md: 20 }}>
                  <Flex
                    boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 10px 0px'}
                    position={'relative'}
                    padding={'2rem'}
                    bgColor={'brand.white'}
                    direction={'column'}
                    gap={5}
                    borderRadius={8}
                    justifyContent={'space-around'}
                    _before={calloutStylesBefore}
                  >
                    <Heading
                      as={'h5'}
                      fontSize={'heading5'}
                      color={'brand.primary.600'}
                      textAlign={'center'}
                    >
                      {item.title}
                    </Heading>
                    <Text fontSize={'label'}>{item.content}</Text>
                  </Flex>
                </Box>
                <Stack
                  alignItems={'center'}
                  mt={10}
                  color={'brand.primary.600'}
                >
                  <Heading as={'h6'}>{item.author}</Heading>
                  <Text fontSize={'label'}>{item.role}</Text>
                </Stack>
              </Box>
            ))}
          </Slider>
        </Box>
      </ViewPortContainer>
    </Box>
  );
};

export default ImageSlider;
