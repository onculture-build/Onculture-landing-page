import { Box, Card, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import styles from './benefits-card.module.css';

interface Benefit {
  title: string;
  image: string;
  description: string;
}

const BenefitCard = ({ title, image, description }: Benefit) => {
  return (
    <Box>
      <Box className={styles['card-inner']}>
        <Card p={10} h={'100%'} w={'100%'} className={styles['card-front']}>
          <Stack gap={10} className={styles['content']}>
            <Box className={styles['image']}>
              <Image src={image} w={24} />
            </Box>
            <Heading
              as={'h5'}
              fontSize={'heading6'}
              className={styles['title']}
            >
              {title}
            </Heading>
          </Stack>
        </Card>
        <Card
          bg={'brand.primary.600'}
          color={'brand.white'}
          p={10}
          h={'100%'}
          className={styles['card-back']}
        >
          <Flex
            gap={10}
            alignItems={'center'}
            justifyContent={'center'}
            h={'100%'}
            className={styles['description']}
          >
            <Text>{description}</Text>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
};

export default BenefitCard;
