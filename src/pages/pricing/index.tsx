import React from 'react';
import ViewPortContainer from '@@/layout/container';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import ErrorPage from '@@/pages/ErrorPage';
import PricingList from '@@lib/db/pricing.json';
import './pricing.css';
import PricingCard from './pricing-card';

const Pricing = () => {
  const [isMonthly, setisMonthly] = React.useState<boolean>(false);

  return (
    <ViewPortContainer>
      <Stack my={64} px={{ base: '2rem', lg: '0' }}>
        <Flex
          justifyContent={'center'}
          direction={'column'}
          alignItems={'center'}
        >
          <Heading
            as={'h2'}
            fontSize={'heading1'}
            maxW={{ lg: '40%' }}
            textAlign={'center'}
          >
            Our plans are tailored for unique teams
          </Heading>
          <Flex alignItems={'center'} gap={10} my={20}>
            <Text
              color={!isMonthly ? 'brand.black.900' : 'brand.gray.800'}
              fontWeight={'bold'}
              fontSize={'heading5'}
            >
              Yearly
            </Text>
            <Switch
              size={'lg'}
              variant={'unstyled'}
              colorScheme='brand.secondary'
              color={'brand.secondary.600'}
              onChange={() => setisMonthly(!isMonthly)}
            />
            <Text
              color={isMonthly ? 'brand.black.900' : 'brand.gray.800'}
              fontWeight={'bold'}
              fontSize={'heading5'}
            >
              Monthly
            </Text>
          </Flex>
        </Flex>
        <Box w={'100%'} mt={32}>
          <Grid
            templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(12, 1fr)' }}
            gap={10}
          >
            {PricingList?.length ? (
              PricingList.map(
                (
                  { recommended, planName, intro, price, benefits },
                  i: number
                ) => {
                  return (
                    <GridItem
                      key={i}
                      position={'relative'}
                      h={'100%'}
                      colSpan={3}
                    >
                      <PricingCard
                        recommended={recommended}
                        name={planName}
                        description={intro}
                        price={price}
                        benefits={benefits}
                        type={isMonthly ? 'month' : 'year'}
                      />
                    </GridItem>
                  );
                }
              )
            ) : (
              <GridItem colSpan={12}>
                <ErrorPage
                  errorTitle='Error fetching our prices'
                  errorText='We are unable to fetch our prices at the moment. Try again later'
                />
              </GridItem>
            )}
          </Grid>
        </Box>
      </Stack>
    </ViewPortContainer>
  );
};

export default Pricing;
