import ArticleCard from '../../../components/article-card';
import Books from '../../../lib/db/books.json';
import { Box, Grid, GridItem } from '@chakra-ui/react';

type Content = {
  id: string;
  textLabel: string;
  headBg: any;
  mainContent: string;
  coverBg: any;
};

const Book = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: 'repeat(4, 1fr)', lg: 'repeat(12, 1fr)' }}
        gap={32}
      >
        {Books.map((book) => (
          <GridItem key={book.id} colSpan={4}>
            <ArticleCard
              id={book.id}
              title={book.title}
              cover={book.cover}
              url={book.url}
              type='book'
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Book;
