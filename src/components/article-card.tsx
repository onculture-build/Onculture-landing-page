import { Box, Card, Image, Stack, Heading, Text, Flex } from '@chakra-ui/react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface IArticle {
  id: string;
  title: string;
  tag?: string;
  cover: string;
  type: 'article' | 'book';
}

const ArticleCard = ({ id, title, tag, cover, type }: IArticle) => {
  return (
    <Card w={'fit-content'} maxW={'365px'} h={'100%'} bg={'brand.gray.600'}>
      <Stack alignItems={'center'} gap={5} h={'100%'}>
        <Flex position={'relative'}>
          <Box w={'100%'}>
            <Image src={cover} w={'100%'} />
          </Box>
          {tag && (
            <Box
              borderRadius={4}
              bgColor={'brand.primary.700'}
              color={'brand.primary.100'}
              fontSize={'label'}
              p={'0.5rem 0.8rem'}
              fontWeight={600}
              position={'absolute'}
              top={4}
              left={4}
            >
              {tag}
            </Box>
          )}
        </Flex>
        <Flex
          direction={'column'}
          justifyContent={'start'}
          px={10}
          py={20}
          gap={20}
          w={'100%'}
        >
          <Heading as={'h5'} fontSize={'heading5'}>
            {title}
          </Heading>
          <Link to={`/resources/${type}/${id}`}>
            <Flex
              color={'brand.secondary.600'}
              _hover={{ color: 'brand.primary.600' }}
              transition={'.3s'}
              alignItems={'center'}
              gap={2}
              mb={10}
            >
              Read <FaArrowRightLong />
            </Flex>
          </Link>
        </Flex>
      </Stack>
    </Card>
  );
};

export default ArticleCard;
