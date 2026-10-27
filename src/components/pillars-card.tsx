import { Box, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

interface PillarCardProps {
  illustration: ReactNode;
  icon: IconType;
  title: string;
  summary: string;
  href: string;
}

const PillarsCard = ({
  illustration,
  icon,
  title,
  summary,
  href,
}: PillarCardProps) => {
  return (
    <Flex
      direction={'column'}
      h={'100%'}
      bg={'brand.white'}
      border={'1px solid'}
      borderColor={'brand.gray.300'}
      borderRadius={'8px'}
      overflow={'hidden'}
      transition={'box-shadow 0.2s ease'}
      _hover={{ boxShadow: '0 8px 24px rgba(92, 0, 221, 0.08)' }}
    >
      <Flex
        h={'144px'}
        bg={'brand.primary.50'}
        alignItems={'center'}
        justifyContent={'center'}
        aria-hidden
      >
        {illustration}
      </Flex>
      <Flex direction={'column'} flex={1} p={{ base: 6, md: 8 }}>
        <Flex alignItems={'center'} gap={4} mb={5}>
          <Flex
            boxSize={'32px'}
            borderRadius={'6px'}
            bg={'brand.primary.50'}
            alignItems={'center'}
            justifyContent={'center'}
            flexShrink={0}
          >
            <Icon as={icon} boxSize={'16px'} color={'brand.primary.600'} />
          </Flex>
          <Heading as={'h3'} fontSize={'heading5'} fontWeight={'semiBold'}>
            {title}
          </Heading>
        </Flex>
        <Text fontSize={'label'} color={'brand.other'} mb={6}>
          {summary}
        </Text>
        <Link
          as={RouterLink}
          to={href}
          mt={'auto'}
          display={'inline-flex'}
          alignItems={'center'}
          gap={2}
          w={'fit-content'}
          fontSize={'label'}
          fontWeight={'semiBold'}
          color={'brand.primary.600'}
          _hover={{ color: 'brand.primary.800', textDecoration: 'none' }}
        >
          Explore {title}
          <Icon as={FiArrowRight} />
        </Link>
      </Flex>
    </Flex>
  );
};

export default PillarsCard;
