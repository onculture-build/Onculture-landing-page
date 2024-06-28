import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import CustomButton from '@@/components/custom-button';
import ViewPortContainer from '@@/layout/container';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const texts = ['GET', 'STAY', 'BE'];
  const [index, setIndex] = React.useState(0);
  const variants = {
    enter: {
      y: -20,
      opacity: 0,
      transition: {
        y: { type: 'spring', stiffness: 300, damping: 200 },
      },
    },
    stop: {
      y: 0,
      opacity: 1,
    },
  };

  React.useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, 5000);
  }, [index, setIndex, texts.length]);

  return (
    <Box
      bgColor={'brand.primary.600'}
      bgImage={'url(/assets/images/dots.png)'}
      bgPosition={'center'}
    >
      <ViewPortContainer>
        <Flex
          as='section'
          w={'90%'}
          mx={'auto'}
          p={48}
          justifyContent={'center'}
          alignItems={'center'}
          gap={14}
          direction={'column'}
        >
          <Heading
            as={'h2'}
            fontSize={'heading1'}
            color={'brand.white'}
            display={'flex'}
            gap={4}
          >
            <motion.span
              variants={variants}
              key={index}
              initial='enter'
              animate='stop'
            >
              {texts[index]}
            </motion.span>
            <Text as={'span'}>OnCulture</Text>
          </Heading>
          <Flex gap={4}>
            <Link to={'/book-demo'}>
              <CustomButton
                variant='primary'
                borderColor={'brand.white'}
                _hover={{
                  color: 'brand.primary.600',
                  backgroundColor: 'brand.white',
                }}
              >
                Book a Demo
              </CustomButton>
            </Link>
            <Link to={'/pricing'}>
              <CustomButton
                variant='primary-outline'
                bgColor={'brand.white'}
                color={'brand.primary.600'}
                _hover={{
                  color: 'brand.white',
                  backgroundColor: 'brand.primary.600',
                }}
              >
                See our Pricing
              </CustomButton>
            </Link>
          </Flex>
        </Flex>
      </ViewPortContainer>
    </Box>
  );
};

export default CallToAction;
