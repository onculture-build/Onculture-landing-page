import { Box, Card, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

interface SocialNetworkCardProps {
  icon: string;
  type: string;
  name: string;
}

const SocialNetworkCard = ({ icon, type, name }: SocialNetworkCardProps) => {
  return (
    <Card
      px={{ base: 10, lg: 20 }}
      py={10}
      h={'100%'}
      boxShadow={'-4px 1px 30px 0px rgba(28, 44, 64, 0.1)'}
    >
      <Flex gap={8}>
        <Box borderRadius={'50%'}>
          <Image src={icon} alt={name} w={'100%'} />
        </Box>
        <Stack>
          <Heading as={'h4'} fontSize={'heading6'} fontWeight={'bold'}>
            {type}
          </Heading>
          <Text>{name}</Text>
        </Stack>
      </Flex>
    </Card>
  );
};

export default SocialNetworkCard;
