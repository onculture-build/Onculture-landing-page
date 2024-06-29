import React from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import SocialNetworks from '../../lib/db/social-networks.json';
import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
} from '@chakra-ui/react';
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import CustomSelect from '../../components/custom-select';
import SocialNetworkCard from '../../components/social-network-card';
import ViewPortContainer from '../../layouts/container';

const contactSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required').nullable(),
  email: Yup.string()
    .email('Not a valid email address')
    .required('email is required')
    .nullable(),
  company: Yup.string().required('Company name is required').nullable(),
  help: Yup.string().required('please tell us how to help you').nullable(),
});

interface Values {
  fullName: string;
  email: string;
  company: string;
  help: string;
}

const Contact = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
  }, [showModal, setShowModal]);

  return (
    <Box className='pillars-page'>
      <ViewPortContainer>
        <Stack
          p={2}
          mb={{ base: '10vh', md: '20vh' }}
          px={{ base: '2rem', lg: '0' }}
        >
          <Heading
            as={'h2'}
            fontSize={'heading2'}
            textAlign={'center'}
            mt={'10vh'}
            mb={20}
          >
            Say Hello!
          </Heading>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            px={{ md: 20 }}
            gap={24}
          >
            {SocialNetworks.slice(0, SocialNetworks.length - 1).map(
              (network) => (
                <GridItem key={network.id}>
                  <Link
                    to={network.url ? network.url : `mailto:${network.name}`}
                    target='_blank'
                  >
                    <SocialNetworkCard
                      icon={network.icon}
                      type={network.type}
                      name={network.name}
                    />
                  </Link>
                </GridItem>
              )
            )}
          </Grid>
          <Stack w={{ base: '100%', md: '45%' }} mx={'auto'} gap={20}>
            <Heading
              as={'h4'}
              fontSize={'heading4'}
              textAlign={'center'}
              w={{ md: '50%' }}
              mx={'auto'}
              mt={'10vh'}
            >
              Or fill out this form we will quickly get back to you
            </Heading>
            <Card
              p={{ base: 10, md: 24 }}
              boxShadow={'-4px 1px 30px 0px rgba(28, 44, 64, 0.1)'}
            >
              <form>
                <Stack gap={10}>
                  <CustomInput
                    name='fullname'
                    label='Fullname'
                    isRequired
                    placeholder='Fullname'
                    p={'2rem'}
                  />
                  <CustomInput
                    name='email'
                    label='Email Address'
                    isRequired
                    type='email'
                    placeholder='Email Address'
                    p={'2rem'}
                  />
                  <CustomInput
                    name='company'
                    label='Company Name'
                    isRequired
                    placeholder='Company Name'
                    p={'2rem'}
                  />
                  <CustomSelect
                    name='reason'
                    label='How can our team help you?'
                    isRequired
                    options={[]}
                    h={'4rem'}
                    optionStyles={{
                      fontSize: 'paragraph',
                    }}
                  />
                  <Box mt={'3vh'}>
                    <CustomButton type={'submit'} w={'100%'}>
                      Submit
                    </CustomButton>
                  </Box>
                </Stack>
              </form>
            </Card>
          </Stack>
        </Stack>
      </ViewPortContainer>
    </Box>
  );
};

export default Contact;
