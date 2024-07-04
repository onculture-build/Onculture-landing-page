import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/custom-button';
import ViewPortContainer from '../../layouts/container';
import { PageRoutes } from '../../lib/constants';

const CallToAction = () => {
  const navigate = useNavigate();
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
    <Box bgColor={'brand.gray.500'}>
      <ViewPortContainer>
        <Flex
          as='section'
          w={'90%'}
          mx={'auto'}
          py={48}
          px={{ lg: 48 }}
          justifyContent={'center'}
          alignItems={'center'}
          gap={14}
          direction={'column'}
          color={'brand.black.600'}
        >
          <Heading
            as={'h2'}
            fontSize={'heading1'}
            display={'flex'}
            gap={4}
            color={'brand.primary.600'}
          >
            <motion.span
              variants={variants}
              key={index}
              initial='enter'
              animate='stop'
            >
              {texts[index]}
            </motion.span>
            <Text as={'span'} color={'brand.black.600'}>
              OnCulture
            </Text>
          </Heading>
          <Text textAlign={'center'} w={{ base: '100%', lg: '70%' }}>
            OnCulture is creating happier, better-engaged and more productive
            teams. You are on your way there.
          </Text>
          <Flex gap={4}>
            <CustomButton
              variant='primary'
              borderColor={'brand.white'}
              _hover={{
                color: 'brand.primary.600',
                backgroundColor: 'brand.white',
              }}
              onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
            >
              Book a Demo
            </CustomButton>
            <CustomButton
              variant='primary-outline'
              bgColor={'brand.white'}
              color={'brand.primary.600'}
              _hover={{
                color: 'brand.white',
                backgroundColor: 'brand.primary.600',
              }}
              onClick={() => navigate(`/${PageRoutes.joinWaitlist}`)}
            >
              Join Waitlist
            </CustomButton>
          </Flex>
        </Flex>
      </ViewPortContainer>
    </Box>
  );
};

export default CallToAction;
