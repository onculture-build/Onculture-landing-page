import React from 'react';
import { Link } from 'react-router-dom';
import SocialNetworks from '../../lib/db/social-networks.json';
import { Box, Card, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import CustomSelect from '../../components/custom-select';
import SocialNetworkCard from '../../components/social-network-card';
import ViewPortContainer from '../../layouts/container';
import { Resolver, useForm } from 'react-hook-form';
import { ContactType } from '../../lib/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactSchema } from '../../lib/schema';

const Contact = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactType>({
    resolver: yupResolver(ContactSchema),
    defaultValues: {
      fullname: '',
      companyName: '',
      email: '',
      details: '',
    },
  } as unknown as { resolver: Resolver<ContactType> });

  const submitHandler = (data: ContactType) => {
    console.log(data);
  };

  return (
    <Box className='pillars-page'>
      <ViewPortContainer>
        <Stack
          p={2}
          mb={{ base: '10vh', md: '20vh' }}
          px={{ base: '2rem', lg: '0' }}
          w={{ base: '100%', md: '45%' }}
          mx={'auto'}
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
              md: 'repeat(2, 1fr)',
            }}
            gap={10}
          >
            {SocialNetworks.map((network) => (
              <GridItem key={network.id}>
                <Link to={network.url} target='_blank'>
                  <SocialNetworkCard
                    icon={network.icon}
                    type={network.type}
                    name={network.name}
                  />
                </Link>
              </GridItem>
            ))}
          </Grid>
          <Stack gap={20}>
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
              <form onSubmit={handleSubmit(submitHandler)}>
                <Stack gap={10}>
                  <CustomInput
                    {...register('fullname')}
                    label='Fullname'
                    isRequired
                    placeholder='Fullname'
                    p={'2rem'}
                    errorMessage={errors.fullname?.message}
                  />
                  <CustomInput
                    {...register('email')}
                    label='Email Address'
                    isRequired
                    type='email'
                    placeholder='Email Address'
                    p={'2rem'}
                    errorMessage={errors.email?.message}
                  />
                  <CustomInput
                    {...register('companyName')}
                    label='Company Name'
                    isRequired
                    placeholder='Company Name'
                    p={'2rem'}
                    errorMessage={errors.companyName?.message}
                  />
                  <CustomSelect
                    {...register('details')}
                    label='How can our team help you?'
                    isRequired
                    options={[]}
                    h={'4rem'}
                    optionStyles={{
                      fontSize: 'paragraph',
                    }}
                    onChange={() => {}}
                    error={errors.details?.message}
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
