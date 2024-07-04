import { Box, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import Programs from '../../lib/db/programs.json';
import PillarsCard from '../../components/pillars-card';
import ViewPortContainer from '../../layouts/container';
const Pillars = () => {
  return (
    <Stack
      bgImage={'url(/assets/svg/line.svg)'}
      bgRepeat={'no-repeat'}
      position={'relative'}
      backgroundPosition={'0px 180px'}
      bgSize={'contain'}
      paddingInline={20}
      mt={'5vh'}
    >
      <ViewPortContainer>
        <Box my={20}>
          <Stack justifyContent={'center'} alignItems={'center'} mb={20}>
            <Heading as={'h2'} fontSize={'heading2'}>
              Our 4 Pillars
            </Heading>
            <Text textAlign={'center'} w={{ lg: '30%' }} fontSize={'label'}>
              Connect, Engage, Develop, Care for, and boost your team's
              productivity.
            </Text>
          </Stack>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            justifyContent={'center'}
            w={{ base: '100%', xl: '80%' }}
            mx={'auto'}
            gap={10}
            my={20}
            h={'100%'}
          >
            {Programs.map((program) => (
              <GridItem key={program.slug}>
                <PillarsCard
                  title={program.title}
                  slug={program.slug}
                  cover={program.image}
                  type={program.type}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </ViewPortContainer>
    </Stack>
  );
};

export default Pillars;
