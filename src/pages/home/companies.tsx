import { Grid, GridItem, Heading, Image, Stack } from '@chakra-ui/react';
import ViewPortContainer from '../../layouts/container';

const Companies = () => {
  return (
    <ViewPortContainer>
      <Stack py={32} alignItems={'center'} justifyContent={'center'} gap={28}>
        <Heading as={'h3'} fontSize={'heading3'}>
          You're in good Company
        </Heading>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(6, 1fr)',
            lg: 'repeat(12, 1fr)',
          }}
          gap={{ base: 20, lg: 36 }}
          mb={{ base: 20, lg: 32 }}
          p={10}
        >
          <GridItem colSpan={3}>
            <Image
              src={'/assets/images/Afycare.png'}
              alt='onculture-afyacare'
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Image
              src={'/assets/images/earnipay.png'}
              alt='onculture-earnipay'
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Image src={'/assets/images/purple.png'} alt='onculture-purple' />
          </GridItem>
          <GridItem colSpan={3}>
            <Image
              src={'/assets/images/euphoria-img.png'}
              alt='onculture-euphoria'
            />
          </GridItem>
        </Grid>
      </Stack>
    </ViewPortContainer>
  );
};

export default Companies;
