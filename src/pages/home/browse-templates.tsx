import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
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
import CustomButton from '../../components/custom-button';
import TemplateCard from '../../components/template-card';
import ViewPortContainer from '../../layouts/container';

const BrowseTemplates = () => {
  const navigate = useNavigate();
  const templatesPreview = TemplateList.slice(0, 3);
  return (
    <Stack
      bgImage={'url(/assets/svg/line2.svg)'}
      bgPosition={{ base: '60px 350px', lg: '100% 200px' }}
      bgRepeat={'no-repeat'}
      bgSize={{ lg: '30%' }}
      p={20}
    >
      <ViewPortContainer>
        <Box my={{ lg: 20 }}>
          <Heading as={'h2'} fontSize={'heading2'} textAlign={'center'}>
            Templates
          </Heading>
          <Box w={{ lg: ' 50%' }} mx={'auto'} mb={30}>
            <Text fontSize={'paragraph'} textAlign={'center'}>
              Build and drive a culture of performance and synergy through our
              <Text as={'span'} fontWeight={700}>
                {' '}
                productivity, engagement, and recognition templates
              </Text>{' '}
              and tools, all integrated with Slack, Teams and Google Workspace.
            </Text>
          </Box>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            justifyContent={'center'}
            alignItems={'center'}
            w={{ base: '100%', lg: '70%' }}
            mx={'auto'}
            gap={10}
            my={20}
            h={'100%'}
          >
            {templatesPreview.map((template) => (
              <GridItem key={template.id} h={'100%'}>
                <TemplateCard
                  icon={template.icon}
                  intro={template.description}
                  title={template.title}
                  slug={template.slug}
                  tag={template.tag}
                />
              </GridItem>
            ))}
          </Grid>
          <Flex alignItems={'center'} justifyContent={'center'} my={28}>
            <CustomButton onClick={() => navigate('/templates')}>
              <span> Browse all templates</span>
              <FiArrowRight fontSize={25} />
            </CustomButton>
          </Flex>
        </Box>
      </ViewPortContainer>
    </Stack>
  );
};

export default BrowseTemplates;
