import CustomButton from '@@/components/custom-button';
import ViewPortContainer from '@@/layout/container';
import { AppUtilities } from '@@/utils';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TemplateData from '@@lib/db/templates.json';
import ErrorPage from '@@/pages/ErrorPage';
import { FaCircle } from 'react-icons/fa6';
import './template.css';

const TemplateInfo = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const templateInfo = TemplateData.find((template) => template.slug === id);

  const location = pathname.split('/').slice(1);

  return (
    <Box className='page'>
      {templateInfo ? (
        <ViewPortContainer>
          <Box mb={'20vh'} p={2} px={{ base: '2rem', lg: '0' }}>
            <Breadcrumb
              separator={<MdChevronRight />}
              py={{ base: 10, md: 20 }}
            >
              {location.map((item, index) => {
                const isCurrentPage = index === location.length - 1;
                return (
                  <BreadcrumbItem key={index} isCurrentPage={isCurrentPage}>
                    <BreadcrumbLink
                      onClick={() =>
                        !isCurrentPage &&
                        navigate(
                          '/' + location.slice(0, location.length - 1).join('/')
                        )
                      }
                      textDecoration={'none'}
                      color={isCurrentPage ? 'brand.primary.500' : ''}
                      fontWeight={isCurrentPage ? 700 : 500}
                    >
                      {item
                        .split('-')
                        .map((i) => AppUtilities.capitalize(i))
                        .join(' ')}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
            <Grid
              templateColumns={{ md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
              my={18}
              gap={10}
            >
              <GridItem order={{ base: 2, md: 1 }}>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  justifyContent={'space-between'}
                  gap={6}
                >
                  <Flex alignItems={{ base: 'center', md: 'start' }} gap={5}>
                    <Image src={templateInfo.icon} w={20} mt={2} />
                    <Stack
                      direction={{ base: 'row', md: 'column' }}
                      alignItems={{ base: 'center', md: 'start' }}
                      justifyContent={{ base: 'space-between' }}
                      w={'100%'}
                    >
                      <Heading
                        as={'h2'}
                        fontSize={{ base: 'heading4', md: 'heading2' }}
                      >
                        {templateInfo.title}
                      </Heading>
                      <Box
                        background={'brand.primary.100'}
                        color={'brand.primary.700'}
                        fontWeight={600}
                        w={'fit-content'}
                        px={5}
                        py={2}
                        borderRadius={4}
                        fontSize={'small'}
                      >
                        {templateInfo.tag}
                      </Box>
                    </Stack>
                  </Flex>
                  <Box>
                    <CustomButton disabled={!templateInfo.isReady}>
                      {templateInfo.isReady ? 'Get Started' : 'Coming Soon'}
                    </CustomButton>
                  </Box>
                </Flex>
                <Stack py={10} gap={6}>
                  {templateInfo.body.intro.map((i, idx) => (
                    <Text key={idx} fontSize={'paragraph'}>
                      {i}
                    </Text>
                  ))}
                </Stack>
                {templateInfo.body.through && (
                  <Text fontWeight={'bold'} mb={5}>
                    Through
                  </Text>
                )}
                <List display={'flex'} flexDirection={'column'} gap={5}>
                  {templateInfo.body.firstList.map((li, idx) => (
                    <ListItem key={idx} gap={5}>
                      <ListIcon color='brand.primary.600'>
                        <FaCircle />
                      </ListIcon>
                      {li}
                    </ListItem>
                  ))}
                </List>
                <Stack my={20}>
                  <Text fontWeight={'bold'} mb={5}>
                    Data Analytics
                  </Text>

                  <List display={'flex'} flexDirection={'column'} gap={5}>
                    {templateInfo.body.secondList.map((li, idx) => (
                      <ListItem key={idx} gap={5}>
                        <ListIcon color='brand.primary.600'>
                          <FaCircle />
                        </ListIcon>
                        {li}
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </GridItem>
              <GridItem order={{ base: 1, md: 2 }}>
                <Flex justifyContent={'center'}>
                  <Image src={templateInfo.body.image} w={'100%'} />
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </ViewPortContainer>
      ) : (
        <ErrorPage errorTitle='Cannot find requested template' />
      )}
    </Box>
  );
};

export default TemplateInfo;
