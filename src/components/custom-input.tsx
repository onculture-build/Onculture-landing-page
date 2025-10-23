import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  ResponsiveValue,
  Switch,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import React, { CSSProperties, ChangeEvent, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import 'react-phone-number-input/style.css';
import PhoneNumberInput from './phone-input';
import { IoInformationCircleOutline } from 'react-icons/io5';

export type CustomInputProps = {
  label?: string;
  labelAddon?: string;
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
  isFile?: boolean;
  optionalFlag?: boolean;
  minDate?: string | Date;
  maxDate?: string | Date;
  variant?: ResponsiveValue<
    (string & {}) | 'outline' | 'filled' | 'flushed' | 'unstyled'
  >;
  forgotPasswordLink?: React.ReactNode;
  disabledSwitch?: boolean;
  labelFont?: any;
} & FlexProps &
  InputProps;

const CustomInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CustomInputProps
>(
  (
    {
      label,
      labelAddon,
      errorMessage,
      isRequired,
      type,
      placeholder,
      variant,
      defaultValue,
      id,
      h = '3.2rem',
      accept,
      textInputStyle,
      w = '100%',
      placeholderStyle,
      onChange,
      isTextArea,
      register,
      isDate,
      isFile,
      isPhone,
      fontSize = 'paragraph',
      minDate,
      maxDate,
      size = 'lg',
      isDisabled = false,
      optionalFlag,
      disabledSwitch,
      labelFont = 'label',
      gap,
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
      if (onChange) {
        onChange(e);
      }
    };

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setIsValue(!!e.target.value.length);
      if (onChange) {
        onChange(e as any);
      }
    };

    const handleClick = () => setShow(!show);

    return (
      <FormControl w={w || 'auto'} isRequired={isRequired}>
        <Flex
          direction={type === 'checkbox' ? 'row-reverse' : 'column'}
          gap={gap || 2}
          alignItems={type === 'checkbox' ? 'center' : ''}
          justifyContent={type === 'checkbox' ? 'start' : ''}
        >
          {label && type !== 'password' ? (
            <Flex alignItems={'baseline'} gap={1}>
              <FormLabel
                htmlFor={id}
                fontSize={labelFont}
                fontWeight={'medium'}
                color='brand.black.900'
                mb={0}
                position={'relative'}
              >
                {label}{' '}
                {optionalFlag && (
                  <Text fontSize={'small'} as={'span'} color='brand.gray.700'>
                    (Optional)
                  </Text>
                )}
                {labelAddon && (
                  <Tooltip
                    label={labelAddon}
                    fontSize={'12px'}
                    bg={'brand.gray.900'}
                    placement={'auto-end'}
                    hasArrow
                  >
                    <Box as='span' cursor={'pointer'}>
                      <Icon
                        as={IoInformationCircleOutline}
                        fontSize={'label'}
                      />
                    </Box>
                  </Tooltip>
                )}
              </FormLabel>
              {disabledSwitch && (
                <Box>
                  <Switch
                    ref={inputRef}
                    colorScheme='brand.primary'
                    size={size}
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
          {isPhone ? (
            <PhoneNumberInput
              id={id}
              w={w}
              h={h}
              fontSize={fontSize}
              borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
              backgroundColor={isValue ? 'brand.primary.100' : 'brand.white'}
              focusBorderColor='brand.primary.500'
              style={{
                ...textInputStyle,
                borderColor: isValue ? 'brand.primary.600' : 'brand.gray.800',
              }}
              defaultValue={defaultValue}
              {...register}
              onChange={handleChange}
              placeholder={placeholder}
              {...rest}
            />
          ) : isTextArea ? (
            <Textarea
              w={w}
              h={h || '6rem'}
              style={{
                ...textInputStyle,
              }}
              border={'1px solid'}
              borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
              backgroundColor={
                isValue && variant !== 'unstyled'
                  ? 'brand.primary.100'
                  : 'brand.white'
              }
              focusBorderColor='brand.primary.500'
              id={id}
              {...rest}
              defaultValue={defaultValue}
              placeholder={placeholder}
              _placeholder={{
                ...placeholderStyle,
                color: 'brand.gray.700',
                fontSize: 'label',
                fontWeight: 'normal',
              }}
              {...register}
              onChange={handleTextAreaChange}
              fontSize={fontSize}
              outlineOffset={'none'}
              variant={variant}
              ref={ref}
            />
          ) : isDate ? (
            <Input
              w={w}
              h={h}
              fontSize={fontSize}
              borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
              backgroundColor={
                isValue && variant !== 'unstyled'
                  ? 'brand.primary.100'
                  : 'brand.white'
              }
              focusBorderColor='brand.primary.500'
              style={{
                ...textInputStyle,
                borderColor: isValue ? 'brand.primary.600' : 'brand.gray.800',
              }}
              type={'date'}
              min={minDate}
              max={maxDate}
              value={rest.value ?? undefined}
              defaultValue={defaultValue}
              placeholder={placeholder}
              {...register}
              onChange={handleChange}
            />
          ) : isFile ? (
            <InputGroup>
              <input
                type='file'
                onChange={handleChange}
                accept={accept}
                ref={inputRef}
                // {...inputProps}
                hidden
              />
              <InputRightElement pointerEvents='none' h={h}>
                <Icon
                  as={FaRegFilePdf}
                  boxSize={8}
                  color='brand.gray.800'
                  mr={4}
                />
              </InputRightElement>
              <Input
                placeholder={placeholder || 'Select files'}
                onClick={() => {
                  if (inputRef?.current) {
                    inputRef?.current?.click();
                  }
                }}
                readOnly={true}
                {...rest}
                {...register}
                h={h}
                fontSize={fontSize}
                borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
                backgroundColor={
                  isValue && variant !== 'unstyled'
                    ? 'brand.primary.100'
                    : 'brand.white'
                }
                focusBorderColor='brand.primary.500'
                style={{
                  ...textInputStyle,
                  borderColor: isValue ? 'brand.primary.600' : 'brand.gray.800',
                }}
                _placeholder={{ fontSize: 'label', color: 'brand.gray.800' }}
                cursor={'pointer'}
              />
            </InputGroup>
          ) : (
            <InputGroup maxW={type === 'checkbox' ? 'fit-content' : 'full'}>
              <Input
                fontSize={fontSize}
                w={w || '100%'}
                height={h}
                borderColor={isValue ? 'brand.primary.600' : 'brand.gray.800'}
                backgroundColor={
                  isValue && variant !== 'unstyled'
                    ? 'brand.primary.100'
                    : 'brand.white'
                }
                fontWeight='regular'
                _placeholder={{ fontSize: 'label', color: 'brand.gray.800' }}
                variant={variant}
                placeholder={placeholder}
                focusBorderColor='brand.primary.500'
                type={type !== 'password' ? type : show ? 'text' : 'password'}
                {...rest}
                disabled={inputDisabled}
                ref={ref}
                {...register}
                onChange={handleChange}
              />
              {type === 'password' && (
                <InputRightElement width='4.5rem' mt='.7rem'>
                  <IconButton
                    aria-label={show ? 'Hide password' : 'Show password'}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleClick}
                    bg='transparent'
                    fontSize={fontSize}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          )}
        </Flex>

        {errorMessage && (
          <FormHelperText fontSize='label' color='red'>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
