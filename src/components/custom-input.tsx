import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  ResponsiveValue,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { CSSProperties, ChangeEvent, useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { TbEyeClosed } from 'react-icons/tb';
// import 'react-phone-number-input/style.css';

type CustomInputProps = {
  label?: string;
  errorMessage?: string | any;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  textInputStyle?: CSSProperties;
  placeholder?: string;
  isTextArea?: boolean;
  isPhone?: boolean;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  control?: any;
  placeholderStyle?: CSSProperties;
  register?: any;
  defaultValue?: any;
  isDate?: boolean;
  minDate?: string | Date;
  maxDate?: string | Date;
  variant?: ResponsiveValue<
    (string & {}) | 'outline' | 'filled' | 'flushed' | 'unstyled'
  >;
  forgotPasswordLink?: React.ReactNode;
  disabledSwitch?: boolean;
} & FlexProps &
  InputProps;

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      errorMessage,
      isRequired,
      type,
      placeholder,
      variant,
      control,
      defaultValue,
      id,
      icon,
      iconPosition,
      h,
      textInputStyle,
      w,
      placeholderStyle,
      onChange,
      isPhone,
      isTextArea,
      register,
      forgotPasswordLink,
      isDate,
      minDate,
      maxDate,
      size = 'lg',
      isDisabled = false,
      disabledSwitch,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const [isValue, setIsValue] = useState<boolean>(false);
    const [inputDisabled, setInputDisable] = useState<boolean>(isDisabled);
    const [isChecked, setIsChecked] = useState<boolean>(isDisabled);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleSwitch = () => {
      setIsChecked(!isChecked);
      setInputDisable(!isChecked);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setIsValue(!!e.target.value.length);
      onChange;
    };

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setIsValue(!!e.target.value.length);
      onChange;
    };

    const handleClick = () => setShow(!show);

    return (
      <FormControl
        w={'auto'}
        isRequired={isRequired && isRequired}
        isInvalid={errorMessage}
      >
        {label && type !== 'password' ? (
          <Flex alignItems={'baseline'} gap={1}>
            <FormLabel
              htmlFor={id}
              fontSize={'label'}
              fontWeight={'medium'}
              color='brand.black.900'
            >
              {label}
            </FormLabel>
            {disabledSwitch && (
              <Box>
                <Switch
                  ref={inputRef}
                  colorScheme='brand.primary'
                  size={'lg'}
                  isChecked={!isChecked}
                  onChange={handleSwitch}
                />
              </Box>
            )}
          </Flex>
        ) : label && type === 'password' ? (
          <FormLabel
            htmlFor={id}
            fontSize={'label'}
            fontWeight={'medium'}
            color='brand.black.900'
            display='flex'
          >
            <Text fontSize={'label'}>{label}</Text>
          </FormLabel>
        ) : null}
        {isTextArea ? (
          <Textarea
            w={w}
            h={h || '6rem'}
            style={{
              ...textInputStyle,
            }}
            border={'1px solid'}
            borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
            backgroundColor={
              errorMessage
                ? 'brand.error.100'
                : isValue
                ? 'brand.primary.100'
                : 'brand.white'
            }
            focusBorderColor='brand.primary.500'
            errorBorderColor='brand.error.500'
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            _placeholder={{
              ...placeholderStyle,
              color: 'brand.gray.700',
              fontSize: 'label',
              fontWeight: 'normal',
            }}
            {...rest}
            onChange={handleTextAreaChange}
            fontSize={'paragraph'}
            outlineOffset={'none'}
            variant={variant}
            {...register}
          />
        ) : isDate ? (
          <Input
            w={w}
            h={h || '3.2rem'}
            fontSize={'paragraph'}
            borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
            backgroundColor={
              errorMessage
                ? 'brand.error.100'
                : isValue
                ? 'brand.primary.100'
                : 'brand.white'
            }
            focusBorderColor='brand.primary.500'
            errorBorderColor='brand.error.500'
            style={{
              ...textInputStyle,
              borderColor: isValue ? 'brand.primary.600' : 'brand.gray.800',
            }}
            type={type || 'date'}
            max={maxDate}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={handleChange}
            {...register}
          />
        ) : !!icon || type === 'password' ? (
          <InputGroup size='lg'>
            {icon &&
              (iconPosition === 'left' ? (
                <InputLeftElement pointerEvents='none'>
                  <Icon
                    as={icon}
                    fontSize={'paragraph'}
                    color='brand.gray.300'
                    mt={'.7rem'}
                  />
                </InputLeftElement>
              ) : (
                <InputRightElement pointerEvents='none'>
                  <Icon
                    as={icon}
                    fontSize={'paragraph'}
                    color='brand.gray.900'
                    fontWeight={'bold'}
                    mt={'.7rem'}
                  />
                </InputRightElement>
              ))}
            <Input
              fontSize={'paragraph'}
              w={w}
              height={h || '3.2rem'}
              borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
              backgroundColor={
                errorMessage
                  ? 'brand.error.100'
                  : isValue
                  ? 'brand.primary.100'
                  : 'brand.white'
              }
              fontWeight='regular'
              _placeholder={{ fontSize: 'label', color: 'brand.gray.800' }}
              variant={variant}
              placeholder={placeholder}
              focusBorderColor='brand.primary.500'
              errorBorderColor='brand.error.500'
              type={type !== 'password' ? 'text' : show ? 'text' : 'password'}
              {...rest}
              ref={ref}
              onChange={handleChange}
              disabled={inputDisabled}
              {...register}
            />
            {type === 'password' && (
              <InputRightElement width='4.5rem' mt='.7rem'>
                <IconButton
                  aria-label={show ? 'Hide password' : 'Show password'}
                  icon={show ? <IoMdEye /> : <TbEyeClosed />}
                  onClick={handleClick}
                  bg='transparent'
                  fontSize={'paragraph'}
                />
              </InputRightElement>
            )}
          </InputGroup>
        ) : (
          <Input
            fontSize={'paragraph'}
            w={w || '100%'}
            height={h || '3.2rem'}
            borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
            backgroundColor={
              errorMessage
                ? 'brand.error.100'
                : isValue
                ? 'brand.primary.100'
                : 'brand.white'
            }
            fontWeight='regular'
            _placeholder={{ fontSize: 'label', color: 'brand.gray.800' }}
            variant={variant}
            placeholder={placeholder}
            focusBorderColor='brand.primary.500'
            errorBorderColor='brand.error.500'
            type={type}
            {...rest}
            disabled={inputDisabled}
            ref={ref}
            onChange={handleChange}
            {...register}
          />
        )}
        {errorMessage && (
          <FormErrorMessage fontSize='label' position={'absolute'}>
            {errorMessage}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

export default CustomInput;
