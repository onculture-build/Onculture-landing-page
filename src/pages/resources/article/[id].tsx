import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import ApiArticles from '../../../lib/db/articles.json';
import ArticleCard from '../../../components/article-card';
import CustomButton from '../../../components/custom-button';
import ViewportContainer from '../../../layouts/container';
import ErrorPage from '../../ErrorPage';

const SingleArticle = () => {
  const { id } = useParams();

  const content = ApiArticles.find((article) => article.id === id);

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
          <Image src={content.cover} w={'100%'} />
        </Box>
        {/* <Text fontSize={{ md: 'heading5' }}>{content.}</Text> */}
      </Stack>
      <Stack my={'30rem'}>
        <Link to={'/resources'}>
          <Text
            textDecor={'underline'}
            textDecorationColor={'brand.secondary.600'}
            textAlign={'end'}
            mb={20}
          >
            View all articles
          </Text>
        </Link>
        <Grid
          templateColumns={{ base: 'repeat(4, 1fr)', lg: 'repeat(12, 1fr)' }}
          gap={32}
          px={{ base: '2rem', lg: '0' }}
        >
          {ApiArticles.slice(0, 3).map((article) => (
            <GridItem key={article.id} colSpan={4}>
              <ArticleCard
                id={article.id}
                title={article.title}
                tag={article.tag}
                cover={article.image}
                type='article'
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </ViewportContainer>
  ) : (
    <ErrorPage errorTitle='Cannot find requested resource' />
  );
};

export default SingleArticle;
