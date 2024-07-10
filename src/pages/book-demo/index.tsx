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
import { IBookADemo } from '../../lib/interfaces';
import { useBookADemo } from '../../services/mutations';
import { useState } from 'react';
import toast from 'react-hot-toast';

const BookDemo = () => {
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { mutate: submitBookDemo, isPending } = useBookADemo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookDemoType>({
    resolver: yupResolver(BookDemoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      employeeCount: '',
      message: '',
    },
  } as unknown as { resolver: Resolver<BookDemoType> });

  const onSubmit: SubmitHandler<BookDemoType> = (data: BookDemoType) => {
    const postData: IBookADemo = {
      email: data.email,
      fields: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        company_name: data.companyName,
        employee_count: data.employeeCount,
        message: data.message,
      },
    };
    submitBookDemo(postData, {
      onSuccess: (res) => {
        setShowModal(true);
      },
      onError: (err) => {
        toast.error('Error submitting form. Please try again.');
        console.error(err);
      },
    });
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
                {...register('message')}
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
                errorMessage={errors.message?.message}
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
