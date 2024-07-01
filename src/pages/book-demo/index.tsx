import { useNavigate } from 'react-router-dom';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/custom-button';
import CustomInput from '../../components/custom-input';
import CustomSelect from '../../components/custom-select';
import ViewPortContainer from '../../layouts/container';
import { BookDemoSchema } from '../../lib/schema';
import { BookDemoType } from '../../lib/types';
import { employeeCount } from '../../lib/constants';

const BookDemo = () => {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookDemoType>({
    resolver: yupResolver(BookDemoSchema),
    defaultValues: {
      fullname: '',
      companyName: '',
      email: '',
      phone: '',
      employeeCount: '',
      details: '',
    },
  } as unknown as { resolver: Resolver<BookDemoType> });

  const onSubmit: SubmitHandler<BookDemoType> = (data: BookDemoType) => {
    console.log(data);
  };

  return (
    <ViewPortContainer>
      <Box w={{ base: '90%', md: '50%', lg: '40%' }} mx={'auto'}>
        <Stack mt={'10vh'} mb={'20vh'}>
          <Heading as={'h2'} fontSize={'heading2'} mb={20}>
            Book a Demo
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={10}>
              <CustomInput
                {...register('fullname')}
                label='Your Fullname'
                isRequired
                placeholder='Fullname'
                p={'2rem'}
                errorMessage={errors.fullname?.message}
              />
              <CustomInput
                {...register('companyName')}
                label='Company Name'
                isRequired
                placeholder='Company Name'
                p={'2rem'}
                errorMessage={errors.companyName?.message}
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
                {...register('phone')}
                label='Phone Number'
                isPhone
                isRequired
                placeholder='Phone Number'
                p={'2rem'}
                errorMessage={errors.phone?.message}
              />
              <CustomSelect
                {...register('employeeCount')}
                label='Employee Count'
                isRequired
                options={employeeCount}
                h={'4rem'}
                optionStyles={{
                  fontSize: 'paragraph',
                }}
                onChange={() => {}}
                error={errors.employeeCount?.message}
              />
              <CustomInput
                {...register('details')}
                label='What are you hoping to achieve with OnCulture'
                isRequired
                isTextArea
                placeholder='What are you hoping to achieve with OnCulture'
                p={'2rem'}
                h={'15rem'}
                placeholderStyle={{
                  fontSize: 'label',
                  color: 'brand.gray.800',
                }}
                errorMessage={errors.details?.message}
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

export default BookDemo;
