import ArticleCard from '../../../components/article-card';
import Articles from '../../../lib/db/articles.json';
import { Box, Grid, GridItem } from '@chakra-ui/react';

const AllArticles = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: 'repeat(4, 1fr)', lg: 'repeat(12, 1fr)' }}
        gap={32}
      >
        {Articles.map((article) => (
          <GridItem key={article.id} colSpan={4}>
            <ArticleCard
              id={article.id}
              title={article.title}
              tag={article.tag}
              url={article.url}
              cover={article.image}
              type='article'
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default AllArticles;
