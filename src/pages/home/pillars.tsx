import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiMessageCircle,
  FiPlay,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PillarsCard from '../../components/pillars-card';
import CustomButton from '../../components/custom-button';
import ViewportContainer from '../../layouts/container';
import { PageRoutes } from '../../lib/constants';

// 9-box: potential (rows, high to low) by performance (columns, low to high)
const NINE_BOX_SHADES = [
  ['brand.primary.100', 'brand.primary.200', 'brand.primary.600'],
  ['brand.gray.500', 'brand.primary.100', 'brand.primary.200'],
  ['brand.gray.500', 'brand.gray.500', 'brand.primary.100'],
];

const NineBoxIllustration = () => (
  <Flex alignItems={'center'} gap={2}>
    <Text
      fontSize={'1rem'}
      color={'brand.other'}
      whiteSpace={'nowrap'}
      transform={'rotate(-90deg)'}
      w={'12px'}
      mb={6}
    >
      Potential
    </Text>
    <Stack spacing={2} alignItems={'center'}>
      <Grid templateColumns={'repeat(3, 30px)'} gap={'5px'}>
        {NINE_BOX_SHADES.flat().map((shade, i) => (
          <Flex
            key={i}
            boxSize={'30px'}
            borderRadius={'4px'}
            bg={shade}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {i === 2 && <Box boxSize={'10px'} borderRadius={'full'} bg={'brand.white'} />}
          </Flex>
        ))}
      </Grid>
      <Text fontSize={'1rem'} color={'brand.other'}>
        Performance
      </Text>
    </Stack>
  </Flex>
);

const FeedChip = ({ label, ml }: { label: string; ml?: string }) => (
  <Flex
    ml={ml}
    w={'176px'}
    bg={'brand.white'}
    borderRadius={'6px'}
    boxShadow={'0 1px 3px rgba(66, 82, 118, 0.08)'}
    p={'8px 10px'}
    gap={3}
    alignItems={'center'}
  >
    <Box boxSize={'22px'} borderRadius={'full'} bg={'brand.primary.200'} flexShrink={0} />
    <Stack spacing={'6px'} flex={1}>
      <Text fontSize={'1rem'} fontWeight={'medium'} color={'brand.primary.600'} lineHeight={1}>
        {label}
      </Text>
      <Box h={'4px'} borderRadius={'full'} bg={'brand.gray.300'} />
    </Stack>
  </Flex>
);

const EngagementIllustration = () => (
  <Stack spacing={3}>
    <FeedChip label={'Shout Out'} />
    <FeedChip label={'Feedback Hub'} ml={'30px'} />
  </Stack>
);

const CourseRow = ({ progress }: { progress: string }) => (
  <Flex
    w={'190px'}
    bg={'brand.white'}
    borderRadius={'6px'}
    boxShadow={'0 1px 3px rgba(66, 82, 118, 0.08)'}
    p={'8px 10px'}
    gap={3}
    alignItems={'center'}
  >
    <Flex
      boxSize={'24px'}
      borderRadius={'4px'}
      bg={'brand.primary.50'}
      alignItems={'center'}
      justifyContent={'center'}
      flexShrink={0}
    >
      <Icon as={FiPlay} boxSize={'10px'} color={'brand.primary.600'} fill={'currentColor'} />
    </Flex>
    <Stack spacing={'6px'} flex={1}>
      <Box h={'4px'} w={'70%'} borderRadius={'full'} bg={'brand.gray.700'} />
      <Box h={'4px'} borderRadius={'full'} bg={'brand.gray.300'}>
        <Box h={'100%'} w={progress} borderRadius={'full'} bg={'brand.primary.600'} />
      </Box>
    </Stack>
  </Flex>
);

const CoursesIllustration = () => (
  <Stack spacing={3}>
    <CourseRow progress={'60%'} />
    <CourseRow progress={'30%'} />
  </Stack>
);

const PILLARS = [
  {
    title: 'Performance',
    icon: FiTrendingUp,
    summary:
      'Set goals, run review cycles, and see the whole team on a 9-box performance matrix.',
    href: '/programs/performance',
    illustration: <NineBoxIllustration />,
  },
  {
    title: 'Engagement',
    icon: FiMessageCircle,
    summary:
      'Team Sum Up, Feedback Hub, Shout Out and more, keeping every team connected.',
    href: '/programs/engagement-and-recognition',
    illustration: <EngagementIllustration />,
  },
  {
    title: 'Courses',
    icon: FiBookOpen,
    summary:
      'Long and bite-sized courses on productivity, harassment, leadership and workplace culture, right inside OnCulture.',
    href: '/programs/learning',
    illustration: <CoursesIllustration />,
  },
];

interface ModuleItem {
  title: string;
  icon: IconType;
  summary: string;
  href?: string;
  comingSoon?: boolean;
}

const MODULES: ModuleItem[] = [
  {
    title: 'HRMS',
    icon: FiUsers,
    summary:
      'Employee records, org structure and self-service HR in one accurate home.',
    href: '/programs/people-and-hr',
  },
  {
    title: 'Time Off',
    icon: FiCalendar,
    summary:
      'Configurable leave policies with simple requests, approvals and balances.',
    href: '/programs/people-and-hr',
  },
  {
    title: 'Recruitment',
    icon: FiBriefcase,
    summary: 'Post roles, track applicants and hire faster with a modern ATS.',
    comingSoon: true,
  },
];

const Pillars = () => {
  const navigate = useNavigate();
  return (
    <Stack
      bgImage={'url(/assets/svg/line.svg)'}
      bgRepeat={'no-repeat'}
      position={'relative'}
      backgroundPosition={'0px 180px'}
      bgSize={'contain'}
      paddingInline={{ base: 0, md: 20 }}
      mt={'5vh'}
    >
      <ViewportContainer>
        <Box my={20} w={{ base: '100%', xl: '80%' }} mx={'auto'}>
          <Stack justifyContent={'center'} alignItems={'center'} mb={16} spacing={3}>
            <Text fontSize={'label'} fontWeight={'medium'} color={'brand.primary.600'}>
              The OnCulture platform
            </Text>
            <Heading as={'h2'} fontSize={'heading2'} textAlign={'center'}>
              Everything HR, in one platform
            </Heading>
            <Text
              textAlign={'center'}
              maxW={'440px'}
              fontSize={'paragraph'}
              color={'brand.other'}
            >
              Connect, engage, develop and take care of your team while
              automating the HR work that used to take all week.
            </Text>
          </Stack>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={5}
          >
            {PILLARS.map((pillar) => (
              <GridItem key={pillar.title}>
                <PillarsCard {...pillar} />
              </GridItem>
            ))}
          </Grid>

          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            mt={10}
            bg={'brand.white'}
            border={'1px solid'}
            borderColor={'brand.gray.300'}
            borderRadius={'8px'}
            overflow={'hidden'}
          >
            {MODULES.map((module, i) => (
              <LinkBox
                key={module.title}
                as={Flex}
                gap={4}
                p={{ base: 5, md: 6 }}
                borderColor={'brand.gray.300'}
                borderTopWidth={{ base: i > 0 ? '1px' : 0, lg: 0 }}
                borderLeftWidth={{ base: 0, lg: i > 0 ? '1px' : 0 }}
                transition={'background-color 0.2s ease'}
                _hover={module.href ? { bg: 'brand.primary.50' } : undefined}
              >
                <Flex
                  boxSize={'26px'}
                  borderRadius={'6px'}
                  bg={'brand.primary.50'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexShrink={0}
                >
                  <Icon as={module.icon} boxSize={'13px'} color={'brand.primary.600'} />
                </Flex>
                <Box>
                  <Flex alignItems={'center'} gap={2} mb={1}>
                    <Heading as={'h4'} fontSize={'label'} fontWeight={'semiBold'}>
                      {module.href ? (
                        <LinkOverlay as={RouterLink} to={module.href}>
                          {module.title}
                        </LinkOverlay>
                      ) : (
                        module.title
                      )}
                    </Heading>
                    {module.comingSoon && (
                      <Badge
                        fontSize={'1rem'}
                        fontWeight={'medium'}
                        textTransform={'none'}
                        color={'brand.other'}
                        bg={'brand.gray.200'}
                        border={'1px solid'}
                        borderColor={'brand.gray.700'}
                        borderRadius={'3px'}
                        px={'6px'}
                      >
                        Coming Soon
                      </Badge>
                    )}
                  </Flex>
                  <Text fontSize={'small'} color={'brand.other'}>
                    {module.summary}
                  </Text>
                </Box>
              </LinkBox>
            ))}
          </SimpleGrid>

          <Flex justifyContent={'center'} mt={10}>
            <CustomButton
              variant={'outline'}
              padding={'1.6rem 2rem'}
              fontSize={'label'}
              fontWeight={'semiBold'}
              borderWidth={'1px'}
              _hover={{ bg: 'brand.primary.600', color: 'brand.white' }}
              onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
            >
              Book a Demo
            </CustomButton>
          </Flex>
        </Box>
      </ViewportContainer>
    </Stack>
  );
};

export default Pillars;
