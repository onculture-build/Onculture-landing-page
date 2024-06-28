import { Box, Card, Image, Stack, Heading, Text, Flex } from '@chakra-ui/react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface IArticle {
  id: string;
  title: string;
  tag?: string;
  url?: string;
  cover: string;
  type: 'article' | 'book';
}

const ArticleCard = ({ title, tag, url, cover, type }: IArticle) => {
  return (
    <Card w={'100%'} maxW={'365px'} h={'100%'} bg={'brand.gray.600'}>
      <Stack alignItems={'center'} gap={5} h={'100%'}>
        <Flex position={'relative'} w={'100%'}>
          <Box
            w={'100%'}
            h={'250px'}
            bg={`url(${cover})`}
            bgSize={'cover'}
            bgRepeat={'no-repeat'}
            bgPosition={'center'}
          />
          {tag && (
            <Box
              borderRadius={4}
              bgColor={'brand.primary.700'}
              color={'brand.primary.100'}
              fontSize={'small'}
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
          p={10}
          gap={20}
          h={'100%'}
          w={'100%'}
        >
          <Heading as={'h5'} fontSize={'heading5'}>
            {title}
          </Heading>
          <Box mt={'auto'}>
            <Link to={url!} target='_blank' referrerPolicy='no-referrer'>
              <Flex
                color={'brand.secondary.600'}
                _hover={{ color: 'brand.primary.600' }}
                transition={'.3s'}
                alignItems={'center'}
                gap={2}
                mb={10}
                mt={'auto'}
              >
                Read <FaArrowRightLong />
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Stack>
    </Card>
  );
};

export default ArticleCard;
