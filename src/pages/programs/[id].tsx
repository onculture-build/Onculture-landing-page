import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Programs from '../../lib/db/programs.json';
import ErrorPage from '../ErrorPage';
import { FaArrowLeftLong, FaCircle } from 'react-icons/fa6';
import './programs.css';
import CustomButton from '../../components/custom-button';
import HeroVideo from '../../components/hero-video';
import ViewportContainer from '../../layouts/container';

const ProgramInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const programInfo = Programs.find((program) => program.slug === id);

  return (
    <Box className='pillars-page'>
      {programInfo ? (
        <ViewportContainer>
          <Box my={'2vh'} mb={'20vh'} p={2} px={{ base: '2rem', lg: '0' }}>
            <Link to={'/'}>
              <Flex color={'brand.gray.900'} gap={2} alignItems={'center'}>
                <FaArrowLeftLong /> Back
              </Flex>
            </Link>
            <Grid
              templateColumns={{ md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
              my={18}
              gap={10}
            >
              <GridItem>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  gap={10}
                  mb={20}
                >
                  <Heading
                    as={'h1'}
                    fontSize={{ base: 'heading3', md: 'heading2' }}
                    maxW={350}
                    textAlign={{ base: 'center', md: 'start' }}
                  >
                    {programInfo.title}
                  </Heading>
                  <Box>
                    <CustomButton onClick={() => {}}>Subscribe</CustomButton>
                  </Box>
                </Flex>
                <Box w={'100%'} mb={10} hideFrom={'1024px'}>
                  <HeroVideo
                    message={'learn about ' + programInfo.title}
                    coverImage={programInfo.image}
                  />
                </Box>
                <Stack py={10} gap={6}>
                  {programInfo.intro.map((i, idx) => (
                    <Text key={idx} fontSize={'paragraph'}>
                      {i}
                    </Text>
                  ))}
                </Stack>
                {programInfo.qa && (
                  <Stack mb={16}>
                    <Text fontWeight={'bold'} mb={5}>
                      {programInfo.qa.ques}
                    </Text>
                    <Text>{programInfo.qa.ans}</Text>
                  </Stack>
                )}
                {programInfo.subs.map((sub) => (
                  <Stack mb={16}>
                    <Text fontWeight={'bold'} mb={5}>
                      {sub.title}
                    </Text>
                    <List display={'flex'} flexDirection={'column'} gap={5}>
                      {sub.items.map((li, idx) => (
                        <ListItem key={idx} gap={5}>
                          <ListIcon color='brand.primary.600'>
                            <FaCircle />
                          </ListIcon>
                          {li}
                        </ListItem>
                      ))}
                    </List>
                  </Stack>
                ))}
              </GridItem>
              <GridItem>
                <Box w={'100%'} hideBelow={'1024px'}>
                  <HeroVideo
                    message={'learn about ' + programInfo.title}
                    coverImage={programInfo.image}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </ViewportContainer>
      ) : (
        <ErrorPage errorTitle='Cannot find requested template' />
      )}
    </Box>
  );
};

export default ProgramInfo;
