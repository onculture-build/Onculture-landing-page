import CustomInput from './custom-input';
import {
  Box,
  Stack,
  Text,
  InputRightElement,
  InputGroup,
  FormLabel,
} from '@chakra-ui/react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';
import { TbCirclePlus } from 'react-icons/tb';

interface Props {
  title: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
}

const CompanyValuesInput = ({
  title,
  register,
  label,
  errors,
  control,
}: Props) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: title,
  });

  return (
    <Stack>
      <FormLabel
        htmlFor={title}
        fontSize={'label'}
        fontWeight={'medium'}
        color='brand.black.900'
      >
        {label}
      </FormLabel>
      {fields.map((field: any, index) => (
        <InputGroup position={'relative'} key={field.id}>
          {fields.length > 1 && (
            <InputRightElement
              position={'absolute'}
              right={2}
              h={'100%'}
              color={'brand.error.600'}
              cursor={'pointer'}
              onClick={() => remove(index)}
            >
              <DeleteIcon fontSize={18} />
            </InputRightElement>
          )}
          <Box w={'100%'}>
            <CustomInput
              {...register(`${title}[${index}].value`, {
                setValueAs: (val) => val,
              })}
              placeholder='Enter a value'
              defaultValue={field.value}
              p={'2rem'}
            />
          </Box>
        </InputGroup>
      ))}
      <Text
        color={'brand.primary.600'}
        mt={5}
        fontWeight={'medium'}
        fontSize={'label'}
        display={'flex'}
        gap={1}
        alignItems={'center'}
        cursor={'pointer'}
        onClick={() => append({ value: '' })}
      >
        <TbCirclePlus fontSize={16} />
        Add New
      </Text>
    </Stack>
  );
};

export default CompanyValuesInput;
