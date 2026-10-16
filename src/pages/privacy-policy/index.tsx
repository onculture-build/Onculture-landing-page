import React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import ViewportContainer from '../../layouts/container';

const LAST_UPDATED = '16 August 2026';
const CONTACT_EMAIL = 'get@onculture.io';

const EmailLink = () => (
  <Link
    href={`mailto:${CONTACT_EMAIL}`}
    color={'brand.primary.600'}
    fontWeight={'semiBold'}
    textDecoration={'underline'}
    textUnderlineOffset={'0.3rem'}
  >
    {CONTACT_EMAIL}
  </Link>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize={'paragraph'} color={'brand.other'} lineHeight={1.75}>
    {children}
  </Text>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <UnorderedList
    spacing={3}
    pl={8}
    ml={0}
    fontSize={'paragraph'}
    color={'brand.other'}
    lineHeight={1.75}
    sx={{ '& li::marker': { color: 'var(--chakra-colors-brand-primary-600)' } }}
  >
    {items.map((item, index) => (
      <ListItem key={index}>{item}</ListItem>
    ))}
  </UnorderedList>
);

const Note = ({ children }: { children: React.ReactNode }) => (
  <Box
    borderLeft={'4px solid'}
    borderColor={'brand.primary.300'}
    bgColor={'brand.primary.50'}
    px={6}
    py={4}
    borderRadius={'0 0.8rem 0.8rem 0'}
  >
    <Text fontSize={'label'} color={'brand.other'}>
      {children}
    </Text>
  </Box>
);

const Term = ({ label, children }: { label: string; children: string }) => (
  <>
    <Text as={'span'} fontWeight={'semiBold'} color={'brand.black.900'}>
      {label}:
    </Text>{' '}
    {children}
  </>
);

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: PolicySection[] = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <>
        <Paragraph>
          Depending on how you and your organisation use OnCulture, we may
          collect:
        </Paragraph>
        <BulletList
          items={[
            <Term label="Account and contact details">
              Names, email addresses, telephone numbers and profile information.
            </Term>,
            <Term label="Employment information">
              Job titles, departments and employment history.
            </Term>,
            <Term label="HR records">
              Leave requests, performance reviews, feedback, learning progress
              and policy acknowledgements.
            </Term>,
            <Term label="Documents and communications">
              Uploaded files, supporting documents and support enquiries.
            </Term>,
            <Term label="Technical information">
              IP addresses, browser details and information about your use of
              our services.
            </Term>,
          ]}
        />
        <Note>
          Some information may require additional protection under applicable
          law.
        </Note>
      </>
    ),
  },
  {
    id: 'how-we-use-your-information',
    title: 'How we use your information',
    content: (
      <>
        <Paragraph>We use personal information to:</Paragraph>
        <BulletList
          items={[
            'Provide, operate and support our services.',
            'Manage accounts and customer relationships.',
            'Enable your organisation’s HR processes.',
            'Respond to enquiries and resolve technical issues.',
            'Protect accounts, prevent misuse and maintain service security.',
            'Comply with legal obligations and address legal claims.',
          ]}
        />
        <Note>
          Additional legal conditions may apply to sensitive information.
        </Note>
      </>
    ),
  },
  {
    id: 'your-organisations-responsibility',
    title: 'Your organisation’s responsibility',
    content: (
      <>
        <Paragraph>
          When your employer or another organisation uses OnCulture to manage
          workforce information, it generally acts as the data controller.
          OnCulture processes that information on its behalf and according to
          its lawful instructions.
        </Paragraph>
        <Paragraph>
          Your organisation determines how workforce information is used and who
          may access it. Please refer to its privacy notice for details.
        </Paragraph>
        <Paragraph>
          OnCulture is responsible for information it processes for its own
          business purposes, such as managing customer relationships and
          enquiries.
        </Paragraph>
      </>
    ),
  },
  {
    id: 'sharing-your-information',
    title: 'Sharing your information',
    content: (
      <>
        <Paragraph>
          We may share information with authorised users within your
          organisation, service providers that help operate our platform, and
          integrations your organisation enables. We may also disclose
          information to professional advisers or authorities where legally
          required or otherwise permitted by applicable law.
        </Paragraph>
        <Paragraph>
          Service providers processing information on our behalf are subject to
          appropriate contractual protections.
        </Paragraph>
      </>
    ),
  },
  {
    id: 'keeping-and-protecting-your-information',
    title: 'Keeping and protecting your information',
    content: (
      <>
        <Paragraph>
          We retain personal information for as long as necessary to provide our
          services and meet legal obligations.
        </Paragraph>
        <Paragraph>
          If your organisation closes its account or stops using OnCulture, we
          will delete or irreversibly anonymise its personal information within
          90 days, unless a longer period is legally required. Any retained
          information will have restricted access and will be deleted when that
          requirement ends.
        </Paragraph>
        <Paragraph>
          For individual workforce accounts, retention follows your
          organisation’s lawful instructions. Deactivating an employee account
          does not automatically delete employment records.
        </Paragraph>
        <Paragraph>
          We use appropriate technical and organisational measures to protect
          personal information. No system can guarantee absolute security.
        </Paragraph>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    content: (
      <>
        <Paragraph>
          Depending on applicable law and the circumstances, you may have the
          right to:
        </Paragraph>
        <BulletList
          items={[
            'Request access to your personal information.',
            'Correct inaccurate or incomplete information.',
            'Request deletion of your information.',
            'Restrict or object to certain processing.',
            'Withdraw consent where processing relies on consent.',
            'Raise concerns about qualifying automated decisions.',
            'Complain to your relevant data protection authority.',
          ]}
        />
        <Paragraph>
          These rights may be subject to legal conditions and exceptions.
        </Paragraph>
        <Paragraph>
          For workforce records, contact your organisation first. For
          information OnCulture controls, contact <EmailLink />. We may need to
          verify your identity before responding.
        </Paragraph>
      </>
    ),
  },
  {
    id: 'changes-to-this-policy',
    title: 'Changes to this policy',
    content: (
      <Paragraph>
        We may update this policy as our services or legal requirements change.
        Updates will appear on this page with a revised effective date.
      </Paragraph>
    ),
  },
  {
    id: 'contact-us',
    title: 'Contact us',
    content: (
      <>
        <Paragraph>For privacy questions or requests, contact:</Paragraph>
        <Box
          bgColor={'brand.gray.400'}
          border={'1px solid'}
          borderColor={'brand.gray.500'}
          borderRadius={'1.2rem'}
          p={8}
        >
          <Text fontSize={'heading6'} fontWeight={'bold'} mb={1}>
            The People Practice
          </Text>
          <EmailLink />
        </Box>
      </>
    ),
  },
];

// Hash navigation would trigger ScrollToTop, so scroll to sections directly.
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const PrivacyPolicy = () => {
  return (
    <>
      <Box bgColor={'brand.gray.400'} py={{ base: 20, md: 28 }}>
        <ViewportContainer>
          <Stack
            alignItems={'center'}
            textAlign={'center'}
            gap={6}
            px={{ base: '2rem', lg: '0' }}
          >
            <Heading as={'h1'} fontSize={{ base: 'heading2', md: 'heading1' }}>
              Privacy Policy
            </Heading>
            <Text
              fontSize={'paragraph'}
              color={'brand.other'}
              maxW={'60rem'}
              lineHeight={1.75}
            >
              OnCulture respects your privacy. This policy explains how we
              handle personal information when you visit our website, use our
              platform or contact us.
            </Text>
            <Text fontSize={'label'} color={'brand.gray.900'}>
              Last updated: {LAST_UPDATED}
            </Text>
          </Stack>
        </ViewportContainer>
      </Box>

      <ViewportContainer>
        <Grid
          templateColumns={{ base: '1fr', lg: '28rem 1fr' }}
          gap={{ base: 12, lg: 24 }}
          py={{ base: 16, md: 24 }}
          px={{ base: '2rem', lg: '0' }}
          maxW={'110rem'}
          mx={'auto'}
        >
          <GridItem hideBelow={'lg'}>
            <Box
              as={'nav'}
              aria-label={'Policy sections'}
              position={'sticky'}
              top={10}
            >
              <Text
                fontSize={'small'}
                fontWeight={'bold'}
                letterSpacing={'0.1em'}
                textTransform={'uppercase'}
                color={'brand.gray.900'}
                mb={5}
              >
                On this page
              </Text>
              <Stack
                as={'ul'}
                listStyleType={'none'}
                gap={1}
                borderLeft={'2px solid'}
                borderColor={'brand.gray.500'}
              >
                {sections.map((section) => (
                  <Box as={'li'} key={section.id}>
                    <Box
                      as={'button'}
                      onClick={() => scrollToSection(section.id)}
                      textAlign={'left'}
                      w={'100%'}
                      py={2}
                      pl={5}
                      ml={'-2px'}
                      borderLeft={'2px solid transparent'}
                      fontSize={'label'}
                      color={'brand.other'}
                      _hover={{
                        color: 'brand.primary.600',
                        borderColor: 'brand.primary.600',
                      }}
                    >
                      {section.title}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </GridItem>

          <GridItem minW={0}>
            <Stack gap={{ base: 14, md: 16 }}>
              {sections.map((section, index) => (
                <Box
                  as={'section'}
                  key={section.id}
                  id={section.id}
                  scrollMarginTop={'2rem'}
                  aria-labelledby={`${section.id}-heading`}
                >
                  <Flex alignItems={'baseline'} gap={4} mb={6}>
                    <Text
                      fontSize={'label'}
                      fontWeight={'bold'}
                      color={'brand.primary.400'}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                    <Heading
                      as={'h2'}
                      id={`${section.id}-heading`}
                      fontSize={'heading4'}
                    >
                      {section.title}
                    </Heading>
                  </Flex>
                  <Stack gap={5}>{section.content}</Stack>
                </Box>
              ))}
            </Stack>
          </GridItem>
        </Grid>
      </ViewportContainer>
    </>
  );
};

export default PrivacyPolicy;
