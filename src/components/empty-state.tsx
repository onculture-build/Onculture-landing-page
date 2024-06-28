import { Flex, Image, Text } from '@chakra-ui/react';

interface EmptyDataIcon {
  icon?: string;
  message?: string;
}

const EmptyDataState = ({ icon, message }: EmptyDataIcon) => {
  return (
    <Flex
      direction='column'
      alignItems={'center'}
      justifyContent={'center'}
      w={'100%'}
      my={10}
    >
      <Flex
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={2}
        mb={4}
      >
        <Image src={icon || '/assets/svg/empty-data.svg'} />
        <Text
          fontWeight={'medium'}
          fontSize={'heading5'}
          color={'brand.gray.800'}
        >
          Nothing here yet
        </Text>
        <Text
          fontSize={'label'}
          color={'brand.gray.900'}
          textAlign={'center'}
          mt={5}
        >
          {message || 'No data available'}
        </Text>
      </Flex>
    </Flex>
  );
};

export default EmptyDataState;
