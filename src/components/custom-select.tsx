import {
  SystemStyleObject,
  Flex,
  FlexProps,
  Text,
  FormControl,
  FormLabel,
  Icon,
  InputLeftElement,
} from '@chakra-ui/react';
import { OptionBase, Select } from 'chakra-react-select';
import { SelectorOptionValue } from '../lib/types';
import { IconType } from 'react-icons/lib';
import React from 'react';

interface PropType {
  register?: any;
  options?: Array<OptionBase & SelectorOptionValue>;
  onChange?: (data: SelectorOptionValue) => void;
  placeholder?: string;
  name?: string;
  containerStyles?: FlexProps;
  selectorStyles?: SystemStyleObject;
  inputStyles?: SystemStyleObject;
  optionStyles?: SystemStyleObject;
  isDisabled?: boolean;
  label?: string;
  isHiddenChevron?: boolean;
  closeOnSelect?: boolean;
  error?: string;
  h?: string | { [key: string]: string | number };
  w?: string | { [key: string]: string | number };
  showBorder?: boolean;
  size?: string;
  closeMenuOnSelect?: boolean;
  value?: SelectorOptionValue;
  defaultValue?: { label: string; value: string }[];
  isRequired?: boolean;
  icon?: IconType;
}

const CustomSelect = React.forwardRef(
  (
    {
      register,
      options,
      onChange,
      placeholder,
      name,
      isDisabled,
      isHiddenChevron,
      label,
      value,
      h = '100%',
      w,
      size = 'lg',
      showBorder = true,
      containerStyles,
      selectorStyles,
      optionStyles,
      closeOnSelect = true,
      inputStyles,
      error,
      defaultValue,
      isRequired,
      icon,
    }: PropType,
    ref
  ) => {
    return (
      <Flex w={w} flexDirection='column' {...containerStyles}>
        {!!label && (
          <FormControl display='flex' isRequired={isRequired && isRequired}>
            <FormLabel
              fontSize={'label'}
              fontWeight={'medium'}
              color='brand.black.900'
            >
              {label}
            </FormLabel>
          </FormControl>
        )}
        {icon && (
          <InputLeftElement>
            <Icon
              as={icon}
              fontSize={'paragraph'}
              color='brand.gray.800'
              fontWeight={'bold'}
              mt={'.8rem'}
            />
          </InputLeftElement>
        )}
        <Select
          instanceId={'react-select'}
          {...register}
          id='filter'
          name={name}
          isDisabled={isDisabled}
          options={options || []}
          value={value}
          placeholder={placeholder || 'Please Select...'}
          closeMenuOnSelect={closeOnSelect}
          defaultValue={defaultValue}
          selectedOptionColorScheme='brand.primary'
          variant='outline'
          blurInputOnSelect
          focusBorderColor='brand.primary.500'
          size={size}
          menuPlacement='auto'
          chakraStyles={{
            dropdownIndicator: (provided, { selectProps }) => ({
              ...provided,
              bg: 'transparent',
              px: 2,
              cursor: 'inherit',
              '> svg': {
                transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
                transition: '.4s ease',
                color: 'brand.other',
              },
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: 'none',
            }),
            option: (provided, state: { isFocused: boolean }) => ({
              ...provided,
              background: state.isFocused ? 'brand.secondary.100' : '#ffffff',
              color: 'brand.black.900',
              fontSize: 'label',
              width: '100%',
              ...optionStyles,
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: 'label',
              color: 'brand.gray.700',
            }),
            container: (provided) => ({
              ...provided,
              minHeight: '3.2rem',
              w: w ? w : '100%',
            }),
            control: (provided, state: { hasValue: boolean }) => ({
              ...provided,
              backgroundColor:
                showBorder && state.hasValue
                  ? 'brand.primary.100'
                  : 'brand.white',
              border: showBorder
                ? '1px solid'
                : '1px solid transparent !important',
              borderColor:
                showBorder && state.hasValue
                  ? 'brand.primary.500'
                  : 'brand.gray.800',
              borderRadius: 4,
              paddingLeft: icon ? '2.5rem' : '1rem',
              height: h,
              width: '100%',
              fontSize: 'paragraph',
              color: showBorder ? 'brand.black.500' : 'brand.primary.600',
              ...selectorStyles,
            }),
            downChevron: (provided) => ({
              ...provided,
              display: isHiddenChevron ? 'none' : 'box',
              color: 'brand.black.900',
            }),
            input: (provided) => ({
              ...provided,
              color: 'brand.black.900',
              ...inputStyles,
              fontSize: 'paragraph',
            }),
            singleValue: (provided) => ({
              ...provided,
              overflow: 'visible',
            }),
            menu: (provided) => ({
              ...provided,
              overflow: 'visible',
              background: '#fff',
            }),
            menuList: (provided) => ({
              ...provided,
              height: '100%',
              width: '100%',
              minWidth: 'fit-content',
              fontSize: 'label',
              padding: '1rem',
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }),
          }}
          onChange={onChange}
        />

        {error && (
          <Text mt={'0.5rem'} fontSize={'label'} color='red'>
            {error}
          </Text>
        )}
      </Flex>
    );
  }
);

export default CustomSelect;
