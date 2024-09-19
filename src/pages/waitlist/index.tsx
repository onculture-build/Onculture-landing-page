import { Stack, Heading, Box, Text, Flex, Spinner } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import ViewportContainer from '../../layouts/container';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import { WaitlistSchema } from '../../lib/schema';
import { WaitlistType } from '../../lib/types';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../lib/constants';
import { IAddToWaitlist } from '../../lib/interfaces';
import { useAddToWaitlist } from '../../services/mutations';
import toast from 'react-hot-toast';

const Waitlist = () => {
  const navigate = useNavigate();
  const { mutate: addToWaitList, isPending } = useAddToWaitlist();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistType>({
    resolver: yupResolver(WaitlistSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  } as unknown as { resolver: Resolver<WaitlistType> });

  const onSubmit: SubmitHandler<WaitlistType> = (data: WaitlistType) => {
    const payload: IAddToWaitlist = {
      email: data.email,
      fields: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    };

    addToWaitList(payload, {
      onSuccess: () => {
        toast.success('You have been added to the waitlist!');
        navigate(PageRoutes.waitlistSuccess);
      },
      onError: (error) => {
        toast.error('Failed to add to waitlist');
        console.error(error);
      },
    });
  };

  return (
    <ViewportContainer>
      <Box w={{ base: '90%', md: '50%', lg: '40%' }} mx={'auto'}>
        <Stack mt={'10vh'} mb={'20vh'}>
          <Stack textAlign={'center'} gap={10}>
            <Heading as={'h2'} fontSize={'heading2'}>
              Join our Waitlist!
            </Heading>
            <Text mb={20}>
              We want you to be the first to know when we launch!
            </Text>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
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
        </Stack>
      </Box>
    </ViewportContainer>
  );
};

export default Waitlist;
