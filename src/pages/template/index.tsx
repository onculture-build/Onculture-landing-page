import TemplateList from '../../lib/db/templates.json';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import './template.css';
import TemplateCard from '../../components/template-card';
import ViewportContainer from '../../layouts/container';

const TemplatesPage = () => {
  return (
    <Box className='all-templates'>
      <ViewportContainer>
        <Box mt={40} mb={'20vh'} p={8} px={{ base: '2rem', lg: '0' }}>
          <Stack alignItems={'center'} gap={10}>
            <Heading as={'h2'} fontSize={'heading2'}>
              Templates
            </Heading>
            <Text textAlign={'center'} w={'70%'} fontSize={'paragraph'}>
              Build a Culture of performance and synergy through our
              productivity, engagement, and recognition templates and tools, all
              integrated with Slack, Teams and Google Workspace.
            </Text>
          </Stack>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            justifyContent={'center'}
            alignItems={'center'}
            w={{ base: '100%', lg: '80%' }}
            mx={'auto'}
            gap={32}
            mt={20}
            h={'100%'}
          >
            {TemplateList.map((template) => (
              <GridItem key={template.id} h={'100%'}>
                <TemplateCard
                  icon={template.icon}
                  intro={template.description}
                  title={template.title}
                  slug={template.slug}
                  tag={template.tag}
                  active={template.isReady}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </ViewportContainer>
    </Box>
  );
};

export default TemplatesPage;
