import {
  Box,
  Card,
  Stack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AppUtilities } from '../../app.utiilities';
import CustomButton from '../../components/custom-button';

interface PricingProps {
  recommended: boolean;
  name: string;
  price: number;
  description: string;
  benefits: Record<string, any>[] | string[];
  type: 'month' | 'year';
  isOnboardingPage?: boolean;
  onClick?: () => void;
}

const PricingCard = ({
  recommended,
  name,
  price,
  description,
  benefits,
  type,
  isOnboardingPage = false,
  onClick,
}: PricingProps) => {
  const navigate = useNavigate();
  return (
    <Card
      h={'100%'}
      py={16}
      px={10}
      position={'relative'}
      cursor={'pointer'}
      bgColor={'rgba(245, 248, 254, 1)'}
      className='pricing-card'
    >
      {recommended && (
        <Box
          bgColor={'brand.primary.600'}
          position={'absolute'}
          color={'brand.white'}
          px={8}
          py={2}
          borderRadius={4}
          top={-8}
          left={{ base: '25%', md: '20%' }}
          fontWeight={'semiBold'}
          className='badge'
        >
          Recommended
        </Box>
      )}
      <Stack>
        <Text
          as={'span'}
          fontSize={'heading5'}
          fontWeight={'semiBold'}
          className='plan-name'
        >
          {name}
        </Text>
        <Heading
          as={'h2'}
          fontSize={54}
          fontWeight={'semiBold'}
          color={'brand.primary.600'}
          className='amount'
        >
          {AppUtilities.formatAmount(price)}
        </Heading>
        <Text
          fontSize={'label'}
          fontWeight={'bold'}
          color={'brand.primary.600'}
          className='duration'
        >
          per user per {type}
        </Text>
        <Text fontSize={'paragraph'} color={'brand.gray.900'} className='desc'>
          {description}
        </Text>

        <Box my={10}>
          <CustomButton w={'100%'} className='btn' onClick={onClick}>
            {isOnboardingPage ? 'Continue' : 'Get Started'}
          </CustomButton>
        </Box>
      </Stack>

      <List>
        {benefits.map((item: any, i: number) => (
          <ListItem key={i}>
            <Flex alignItems={'center'}>
              <ListIcon fontSize={'heading5'}>
                <BiCheck />
              </ListIcon>
              {item.addsonTitle}
            </Flex>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PricingCard;
