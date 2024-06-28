import React from 'react';
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
import './pricing.css';
import PricingCard from './pricing-card';
import ViewPortContainer from '../../layouts/container';
import { useGetSubscriptionPlans } from '../../services/queries/subscriptions.query';
import LoadingSpinner from '../../components/spinner';
import { AppUtilities } from '../../app.utiilities';
import EmptyDataState from '../../components/empty-state';

const Pricing = () => {
  const [isMonthly, setisMonthly] = React.useState<boolean>(false);

  const { data: AllPlans, isLoading } = useGetSubscriptionPlans();

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
            {isLoading ? (
              <GridItem colSpan={12}>
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  w={'100%'}
                >
                  <LoadingSpinner />
                </Flex>
              </GridItem>
            ) : AllPlans?.length ? (
              (AllPlans || []).map((plan: any) => {
                return (
                  <GridItem key={plan.id} position={'relative'} h={'100%'}>
                    <PricingCard
                      recommended={plan.recommend}
                      name={AppUtilities.capitalize(plan.planName)}
                      description={plan.intro}
                      price={plan.price}
                      benefits={plan.benefits}
                      type={isMonthly ? 'month' : 'year'}
                    />
                  </GridItem>
                );
              })
            ) : (
              <GridItem colSpan={12}>
                <EmptyDataState message='Unable to fetch subscriptions. Try again later' />
              </GridItem>
            )}
          </Grid>
        </Box>
      </Stack>
    </ViewPortContainer>
  );
};

export default Pricing;
