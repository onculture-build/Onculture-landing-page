import { Box, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import BenefitData from '../../lib/db/benefits.json';
import BenefitCard from '../../components/benefits-card/benefits-card';

const Benefits = () => {
  return (
    <Stack p={10}>
      <Stack p={10}>
        <Heading as={'h2'} fontSize={'heading2'} textAlign={'center'}>
          Why OnCulture?
        </Heading>
        <Box w={{ lg: '40%' }} mx={'auto'} mb={30} textAlign={'center'}>
          <Text fontSize={'paragraph'} textAlign={'center'}>
            We help you shape the shared behaviours of your entire company,
            while promoting practices.
          </Text>
          <Text fontSize={'paragraph'}>Benefits are:</Text>
        </Box>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          w={{ base: '100%', lg: '80%' }}
          mx={'auto'}
          gap={10}
          my={20}
        >
          {BenefitData.map((data) => (
            <GridItem key={data.id}>
              <BenefitCard
                title={data.title}
                image={data.img}
                description={data.description}
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Benefits;
