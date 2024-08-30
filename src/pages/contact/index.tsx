import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialNetworks from '../../lib/db/social-networks.json';
import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import CustomSelect from '../../components/custom-select';
import SocialNetworkCard from '../../components/social-network-card';
import ViewPortContainer from '../../layouts/container';
import { Resolver, useForm } from 'react-hook-form';
import { ContactType } from '../../lib/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContactSchema } from '../../lib/schema';
import { useContactUs } from '../../services/mutations';
import { IContactUs } from '../../lib/interfaces';
import toast from 'react-hot-toast';
import { contactUsReasons } from '../../lib/constants';
import CustomModal from '../../components/modal';
import { FaCircleCheck } from 'react-icons/fa6';

const Contact = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: submitContactUs, isPending } = useContactUs();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactType>({
    resolver: yupResolver(ContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      reason: '',
    },
  } as unknown as { resolver: Resolver<ContactType> });

  const submitHandler = (data: ContactType) => {
    const postData: IContactUs = {
      email: data.email,
      fields: {
        first_name: data.firstName,
        last_name: data.lastName,
        company_name: data.companyName,
        reason: data.reason,
        message: data.message,
      },
    };
    submitContactUs(postData, {
      onSuccess: (res) => {
        setShowModal(true);
      },
      onError: (err) => {
        toast.error('Error submitting form. Please try again.');
        console.error(err);
      },
    });
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
                    {...register('firstName')}
                    label='First Name'
                    isRequired
                    placeholder='Your first name'
                    p={'2rem'}
                    errorMessage={errors.firstName?.message}
                  />
                  <CustomInput
                    {...register('lastName')}
                    label='Last Name'
                    placeholder='Your last name'
                    p={'2rem'}
                    errorMessage={errors.lastName?.message}
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
                    {...register('reason')}
                    label='How can our team help you?'
                    isRequired
                    options={contactUsReasons}
                    h={'4rem'}
                    optionStyles={{
                      fontSize: 'paragraph',
                    }}
                    onChange={() => {}}
                    error={errors.reason?.message}
                  />
                  <Box mt={'3vh'}>
                    <CustomButton type={'submit'} w={'100%'}>
                      <Flex alignItems={'center'} gap={2}>
                        {isPending && <Spinner size={'md'} />}
                        {isPending ? 'Submitting...' : 'Submit'}
                      </Flex>
                    </CustomButton>
                  </Box>
                </Stack>
              </form>
            </Card>
          </Stack>
        </Stack>
      </ViewPortContainer>
      <CustomModal onClose={() => setShowModal(!showModal)} isOpen={showModal}>
        <Stack
          alignItems={'center'}
          justifyContent={'space-around'}
          py={20}
          gap={20}
          border={'1px solid red'}
        >
          <Flex color={'brand.primary.600'}>
            <FaCircleCheck fontSize={'64px'} />
          </Flex>
          <Stack textAlign={'center'} h={'100%'}>
            <Heading as={'h3'} fontSize={'heading3'}>
              Message Sent Successfully!
            </Heading>
            <Text maxW={{ base: '100%', md: '70%' }} mx={'auto'}>
              Thank you for reaching out to us. A representative will be in
              touch with you as soon as possible.
            </Text>
          </Stack>
          <CustomButton
            onClick={() => navigate('/')}
            w={'fit-content'}
            mx={'auto'}
          >
            Continue
          </CustomButton>
        </Stack>
      </CustomModal>
    </Box>
  );
};

export default Contact;
