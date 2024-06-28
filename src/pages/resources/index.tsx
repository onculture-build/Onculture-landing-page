import React, { ReactNode } from 'react';
import {
  Box,
  Heading,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Book from './book';
import AllArticles from './article';
import ViewPortContainer from '../../layouts/container';

const Resources: { menu: string; component: ReactNode }[] = [
  {
    menu: 'Articles',
    component: <AllArticles />,
  },
  {
    menu: 'Books',
    component: <Book />,
  },
];

const ResourcesPage = () => {
  return (
    <ViewPortContainer>
      <Stack py={{ base: 20, md: 40 }} px={{ base: '2rem', lg: '0' }}>
        <Heading
          as={'h2'}
          fontSize={{ base: 'heading2', md: 'heading1' }}
          fontWeight={'semiBold'}
          mt={10}
          w={{ md: '50%' }}
        >
          Articles & Books for HR professionals and people leaders
        </Heading>
        <Box my={32}>
          <Tabs variant={'unstyled'} color={'brand.primary'}>
            <TabList w={'fit-content'} alignItems={'start'} gap={20}>
              {Resources.map((resource, index) => (
                <Tab
                  key={index}
                  _selected={{ color: 'black' }}
                  color={'brand.gray.700'}
                  fontSize={'heading5'}
                  p={0}
                >
                  {resource.menu}
                </Tab>
              ))}
            </TabList>
            <TabIndicator
              mt='-1.5px'
              height='2px'
              bg='brand.secondary.500'
              borderRadius='1px'
              width={'2px'}
            />
            <TabPanels my={32}>
              {Resources.map((resource, index) => (
                <TabPanel key={index} p={0}>
                  {resource.component}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </ViewPortContainer>
  );
};

export default ResourcesPage;
