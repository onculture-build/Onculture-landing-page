import CustomInput from '../../components/custom-input';
import CustomButton from '../../components/custom-button';
import { Heading, Stack, Text, Box, Spinner } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import ViewportContainer from '../../layouts/container';
import { PageRoutes } from '../../lib/constants';
import { UserSignUpType } from '../../lib/types';
import { UserSignUpSchema } from '../../lib/schema';
import { useCheckAllowedUser } from '../../services/mutations';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';
import { authUser } from '../../services/store/selectors';
import { saveUserInfo } from '../../services/store/slices/auth';
import toast from 'react-hot-toast';

const SignUp = () => {
  const { mutate: checkUser, isPending } = useCheckAllowedUser();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector(authUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    resolver: yupResolver(UserSignUpSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    },
  } as unknown as { resolver: Resolver<UserSignUpType> });

  const onSubmit: SubmitHandler<UserSignUpType> = (data: UserSignUpType) => {
    checkUser(data, {
      onSuccess: (res) => {
        dispatch(saveUserInfo(data));
        navigate(`/${PageRoutes.signup}/${PageRoutes.companyOnboarding}`);
      },

      onError: (err: any) => {
        if (err?.status === 401) {
          navigate(`/${PageRoutes.signup}/${PageRoutes.signupFailure}`);
        } else {
          toast.error(err.message);
        }
      },
    });
  };

  return (
    <ViewportContainer>
      <Box
        p={{ base: 10, md: 24 }}
        maxW={{ base: '100%', md: '70%', xl: '50%' }}
        mx={'auto'}
        my={'10vh'}
      >
        <Heading
          textAlign='center'
          fontSize={'heading2'}
          fontWeight={'bold'}
          mb={5}
        >
          Sign Up
        </Heading>
        <Text textAlign={'center'}>
          Sign up to OnCulture with your Workspace
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={10} gap={10}>
            <CustomInput
              {...register('firstName')}
              placeholder='First Name'
              label='First Name'
              isRequired
              p={'2rem'}
              errorMessage={errors.firstName?.message}
            />
            <CustomInput
              {...register('lastName')}
              placeholder='Last Name'
              label='Last Name'
              isRequired
              p={'2rem'}
              errorMessage={errors.lastName?.message}
            />
            <CustomInput
              {...register('email')}
              placeholder='Email Address'
              label='Email Address'
              isRequired
              p={'2rem'}
              errorMessage={errors.email?.message}
            />
            <Box w={'fit-content'} mx={'auto'} mt={12}>
              <CustomButton py={7} type={'submit'} gap={3}>
                {isPending && <Spinner color='#FFF' speed='0.5s' />}
                Next
              </CustomButton>
            </Box>
          </Stack>
        </form>
        <Text textAlign={'center'} mt={10}>
          Already have an account?{' '}
          <Text
            as={'span'}
            color={'brand.secondary.600'}
            fontWeight={'medium'}
            fontSize={'label'}
          >
            <Link to={`/${PageRoutes.login}`}>Login </Link>
          </Text>
        </Text>
      </Box>
    </ViewportContainer>
  );
};

export default SignUp;
