import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Programs from '../../lib/db/programs.json';
import ErrorPage from '../ErrorPage';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import CustomButton from '../../components/custom-button';
import CtaBand from '../../components/cta-band';
import { PageRoutes } from '../../lib/constants';

const PageSection = ({ children }: { children: React.ReactNode }) => (
  <Box w='100%' maxW='1232px' mx='auto' px={{ base: '16px', md: '24px' }}>
    {children}
  </Box>
);

// Slugs from the previous program pages, kept so old links and bookmarks still resolve.
const LEGACY_PROGRAM_SLUGS: Record<string, string> = {
  hris: 'people-and-hr',
  'toolkits-&-insights': 'performance',
  'interactive-learning-course': 'learning',
  'people-resource-bank': 'learning',
};

const ProgramInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const programInfo = Programs.find((program) => program.slug === id);

  if (!programInfo && id && LEGACY_PROGRAM_SLUGS[id]) {
    return <Navigate to={`/programs/${LEGACY_PROGRAM_SLUGS[id]}`} replace />;
  }

  if (!programInfo) {
    return <ErrorPage errorTitle='Cannot find requested page' />;
  }

  const otherPrograms = Programs.filter((program) => program.slug !== id);

  return (
    <Box w='100%'>
      {/* Hero */}
      <Box bg='brand.primary.50' py={{ base: '40px', md: '56px' }}>
        <PageSection>
          <Link to={'/'}>
            <Flex
              color='#5F6170'
              gap='8px'
              alignItems='center'
              fontSize='14px'
              mb='28px'
              _hover={{ color: 'brand.primary.600' }}
            >
              <FaArrowLeftLong /> Back to home
            </Flex>
          </Link>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '32px', lg: '56px' }}
            align={{ lg: 'center' }}
          >
            <Box flex={1}>
              <Text
                fontSize='13px'
                fontWeight='semiBold'
                letterSpacing='0.06em'
                textTransform='uppercase'
                color='brand.primary.600'
                mb='16px'
              >
                {programInfo.title}
              </Text>
              <Heading
                as='h1'
                fontSize={{ base: '32px', md: '44px' }}
                lineHeight={1.15}
                fontWeight='bold'
                letterSpacing='-0.02em'
                color='#16161D'
                maxW='640px'
                mb='20px'
              >
                {programInfo.tagline}
              </Heading>
              {programInfo.intro.map((paragraph, idx) => (
                <Text
                  key={idx}
                  fontSize={{ base: '16px', md: '17px' }}
                  lineHeight='29px'
                  color='#4B4D5A'
                  maxW='600px'
                  mb='24px'
                >
                  {paragraph}
                </Text>
              ))}
              <Flex gap='12px' wrap='wrap'>
                <CustomButton
                  fontSize='14px'
                  padding='1.4rem 2.2rem'
                  onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
                >
                  Book a Demo
                </CustomButton>
                {programInfo.link && (
                  <CustomButton
                    variant='outline'
                    fontSize='14px'
                    padding='1.4rem 2.2rem'
                    onClick={() => navigate(programInfo.link.href)}
                  >
                    {programInfo.link.label}
                  </CustomButton>
                )}
              </Flex>
            </Box>
            <Box
              flex={{ lg: '0 0 440px' }}
              h={{ base: '200px', md: '260px' }}
              borderRadius='8px'
              overflow='hidden'
            >
              <Image
                src={programInfo.image}
                alt=''
                w='100%'
                h='100%'
                objectFit='cover'
              />
            </Box>
          </Flex>
        </PageSection>
      </Box>

      {/* Features */}
      <Box py={{ base: '48px', md: '64px' }}>
        <PageSection>
          <Heading
            as='h2'
            fontSize={{ base: '22px', md: '26px' }}
            fontWeight='bold'
            color='#16161D'
            mb='24px'
          >
            What's included
          </Heading>
          <Grid
            templateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap='20px'
          >
            {programInfo.features.map((feature) => (
              <Box
                key={feature.title}
                p='22px'
                border='1px solid'
                borderColor='#E7E7EE'
                borderRadius='6px'
                borderTop='3px solid'
                borderTopColor='brand.primary.600'
              >
                <Heading
                  as='h3'
                  fontSize='16px'
                  fontWeight='semiBold'
                  color='#16161D'
                  mb='8px'
                >
                  {feature.title}
                </Heading>
                <Text fontSize='14px' lineHeight='22px' color='#5F6170'>
                  {feature.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </PageSection>
      </Box>

      {/* Other pillars */}
      <Box pb={{ base: '56px', md: '72px' }}>
        <PageSection>
          <Text fontSize='14px' color='#5F6170' mb='14px'>
            Explore the rest of OnCulture
          </Text>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap='16px'
          >
            {otherPrograms.map((program) => (
              <Link key={program.slug} to={`/programs/${program.slug}`}>
                <Flex
                  h='100%'
                  p='18px 20px'
                  border='1px solid'
                  borderColor='#E7E7EE'
                  borderRadius='6px'
                  justify='space-between'
                  align='center'
                  gap='16px'
                  transition='border-color 0.2s'
                  _hover={{ borderColor: 'brand.primary.300' }}
                >
                  <Box>
                    <Text fontSize='15px' fontWeight='semiBold' mb='4px'>
                      {program.title}
                    </Text>
                    <Text fontSize='13px' color='#5F6170'>
                      {program.summary}
                    </Text>
                  </Box>
                  <Box color='brand.primary.600' flexShrink={0}>
                    <FaArrowRightLong />
                  </Box>
                </Flex>
              </Link>
            ))}
          </Grid>
        </PageSection>
      </Box>

      <CtaBand
        title={`See ${programInfo.title} in action`}
        description='Book a demo and we will walk you through how OnCulture fits your team.'
      />
    </Box>
  );
};

export default ProgramInfo;
