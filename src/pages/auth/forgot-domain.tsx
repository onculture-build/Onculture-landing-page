import CustomInput from '../../components/custom-input';
import CustomButton from '../../components/custom-button';
import { Heading, Stack, Text, Box, Spinner } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver, SubmitHandler } from 'react-hook-form';
import ViewportContainer from '../../layouts/container';
import { PageRoutes } from '../../lib/constants';
import { ForgotDomainType } from '../../lib/types';
import { ForgotDomainSchema } from '../../lib/schema';
import { useForgotCompanyDomain } from '../../services/mutations';
import { useState } from 'react';

const ForgotDomain = () => {
  const { mutate: forgotCompanyDomain, isPending } = useForgotCompanyDomain();
  const [apiErrResponse, setApiErrResponse] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotDomainType>({
    resolver: yupResolver(ForgotDomainSchema),
    defaultValues: {
      email: '',
    },
  } as unknown as { resolver: Resolver<ForgotDomainType> });

  const onSubmit: SubmitHandler<ForgotDomainType> = (
    data: ForgotDomainType
  ) => {
    forgotCompanyDomain(data, {
      onSuccess: (res) => {
        navigate(`/${PageRoutes.forgotDomainSuccess}`);
      },
      onError: (err: any) => {
        console.error(err.data?.message);
        setApiErrResponse(err.data?.message);
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
          Forgot Company URL
        </Heading>
        <Text textAlign={'center'}>
          Enter your email to get your company's URL
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={10} gap={16}>
            <CustomInput
              {...register('email')}
              placeholder='Email Address'
              label='Email Address'
              isRequired
              p={'2rem'}
              errorMessage={errors.email?.message || apiErrResponse}
            />
            <Box w={'fit-content'} mx={'auto'}>
              <CustomButton py={7} type={'submit'} gap={3}>
                {isPending && <Spinner color='#FFF' speed='0.5s' />}
                Continue
              </CustomButton>
            </Box>
          </Stack>
        </form>
        <Text textAlign={'center'} mt={10}>
          Don't know your company's custom URL?{' '}
          <Text
            as={'span'}
            color={'brand.secondary.600'}
            fontWeight={'medium'}
            fontSize={'label'}
          >
            <Link to={`/${PageRoutes.login}`}>Click here</Link>
          </Text>
        </Text>
      </Box>
    </ViewportContainer>
  );
};

export default ForgotDomain;
