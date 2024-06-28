import { Box, Card, Flex, Heading, Image, Text } from '@chakra-ui/react';
import CustomButton from './custom-button';
import { useNavigate } from 'react-router-dom';

interface PillarCardProps {
  cover: string;
  title: string;
  type: string;
  slug: string;
}

const PillarsCard = ({ cover, title, type, slug }: PillarCardProps) => {
  const navigate = useNavigate();
  return (
    <Card h={'100%'}>
      <Image src={cover} borderRadius={'4px 4px 0 0'} />
      <Flex
        direction={'column'}
        textAlign={'center'}
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 14 }}
        h={'100%'}
      >
        <Heading as={'h5'} fontSize={'heading5'} mb={5}>
          {title}
        </Heading>
        <Text fontSize={'label'} mb={5}>
          {type}
        </Text>
        <CustomButton
          mt={'auto'}
          padding={'1.5rem 1rem'}
          onClick={() => navigate(`/programs/${slug}`)}
        >
          See details
        </CustomButton>
      </Flex>
    </Card>
  );
};

export default PillarsCard;
