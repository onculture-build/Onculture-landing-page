import { Stack, Heading, Box, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import ViewPortContainer from '../../layouts/container';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import { WaitlistSchema } from '../../lib/schema';
import { WaitlistType } from '../../lib/types';

const Waitlist = () => {
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
    console.log(data);
  };
  return (
    <ViewPortContainer>
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
                  Submit
                </CustomButton>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Box>
    </ViewPortContainer>
  );
};

export default Waitlist;
