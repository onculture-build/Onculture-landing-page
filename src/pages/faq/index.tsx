import FaqData from '@@lib/db/faq.json';
import ViewPortContainer from '@@/layout/container';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

const Faq = () => {
  return (
    <ViewPortContainer>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        my={'15vh'}
        px={{ base: '2rem', lg: '0' }}
      >
        <Heading as={'h2'} fontSize={'heading2'} mb={20} textAlign={'center'}>
          Frequently Asked Questions
        </Heading>
        <Box w={{ base: '100%', md: '50%' }} minH={'50vh'}>
          <Accordion allowToggle>
            {FaqData.map((data) => (
              <AccordionItem key={data.id} mb={4} bgColor={'brand.gray.400'}>
                {({ isExpanded }) => (
                  <>
                    <Box
                      bgColor={isExpanded ? 'brand.primary.600' : ''}
                      color={isExpanded ? 'brand.white' : ''}
                      _hover={{
                        bgColor: !isExpanded ? 'brand.primary.100' : '',
                      }}
                    >
                      <AccordionButton>
                        <Flex
                          as={'span'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          w={'100%'}
                          p={5}
                          gap={10}
                        >
                          <Text
                            fontSize={'paragraph'}
                            fontWeight={isExpanded ? 'bold' : 'medium'}
                            textAlign={'left'}
                          >
                            {data.question}
                          </Text>
                          <AccordionIcon fontSize={'heading5'} />
                        </Flex>
                      </AccordionButton>
                    </Box>
                    <AccordionPanel
                      bgColor={'brand.gray.500'}
                      color={'brand.other'}
                      p={12}
                    >
                      <Text fontSize={'label'} textAlign={'center'}>
                        {data.answer}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Stack>
    </ViewPortContainer>
  );
};

export default Faq;
