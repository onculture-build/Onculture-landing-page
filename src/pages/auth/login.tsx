import CustomInput from '../../components/custom-input';
import CustomButton from '../../components/custom-button';
import {
  Heading,
  Stack,
  Text,
  Box,
  Spinner,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import ViewportContainer from '../../layouts/container';
import { PageRoutes } from '../../lib/constants';
import { UserLoginType } from '../../lib/types';
import { UserLoginSchema } from '../../lib/schema';
import { useLoginUser } from '../../services/mutations';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const [apiErrResponse, setApiErrResponse] = useState('');
  const { mutate: loginUser, isPending } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserLoginType>({
    resolver: yupResolver(UserLoginSchema),
    defaultValues: {
      code: '',
    },
  } as unknown as { resolver: Resolver<UserLoginType> });

  const onSubmit: SubmitHandler<UserLoginType> = (data: UserLoginType) => {
    loginUser(data, {
      onSuccess: (res) => {
        window.open(res.data.url, '_blank');
      },
      onError: (err: any) => {
        toast.error(err.data.message);
        setApiErrResponse(err.data.message);
      },
    });
  };

  const companyDomain = import.meta.env.VITE_COMPANY_DOMAIN;

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
          Log in
        </Heading>
        <Text textAlign={'center'}>Login to OnCulture with your Workspace</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={10} gap={10}>
            <Stack justifyContent={'center'}>
              <Flex alignItems={'end'} justifyContent={'center'} gap={3}>
                <CustomInput
                  {...register('code')}
                  placeholder='subdomain'
                  label='Company Domain'
                  isRequired
                  p={'2rem'}
                  w={'200px'}
                />
                <Text pb={3} fontSize={'heading5'}>
                  .{companyDomain || 'onculture.io'}
                </Text>
              </Flex>
              {(errors.code?.message || apiErrResponse) && (
                <Text fontSize='small' textAlign={'center'} color='red'>
                  {errors.code?.message || apiErrResponse}
                </Text>
              )}
            </Stack>
            <Box w={'fit-content'} mx={'auto'}>
              <CustomButton py={7} type={'submit'} gap={3} disabled={!isValid}>
                {isPending && <Spinner color='#FFF' speed='0.5s' />}
                Continue
              </CustomButton>
            </Box>
          </Stack>
        </form>
        <Text textAlign={'center'} mt={10}>
          Don't know your company's subdomain?{' '}
          <Text
            as={'span'}
            color={'brand.secondary.600'}
            fontWeight={'medium'}
            fontSize={'label'}
          >
            <Link to={`/${PageRoutes.auth}/${PageRoutes.forgotDomain}`}>
              Click here
            </Link>
          </Text>
        </Text>
      </Box>
    </ViewportContainer>
  );
};

export default Login;
