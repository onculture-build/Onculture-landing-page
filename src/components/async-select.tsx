import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate';

interface AsyncSelectProps extends AsyncPaginateProps<any, any, any, any> {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
  register?: any;
  htmlFor?: string;
  placeholder?: string;
  loadOptions: any;
  handleChange?: any;
  onChange?: (e: any) => void;
  value?: any;
  isMulti?: boolean;
  labelWeight?: string;
  labelSize?: string;
  labelColor?: string;
  bgColor?: string;
  isClearable?: boolean;
  w?: string;
  h?: string;
  placeholderSize?: string;
  placeholderColor?: string;
  singleValueSize?: string;
  isDisabled?: boolean;
  closeOnSelect?: boolean;
}

const AsyncSelect: FunctionComponent<AsyncSelectProps> = ({
  isRequired,
  label,
  errorMessage,
  register,
  htmlFor,
  placeholder,
  loadOptions,
  handleChange,
  onChange,
  value,
  labelWeight = '700',
  labelSize = '1.6rem',
  labelColor = 'gray',
  bgColor = 'white',
  isClearable = false,
  w,
  h,
  placeholderSize = 'label',
  placeholderColor = 'gray',
  singleValueSize = '1.4rem',
  isDisabled,
  isMulti,
  closeOnSelect,
  ...otherProps
}) => {
  return (
    <FormControl isRequired={isRequired} w={w}>
      {label && (
        <FormLabel
          fontSize={labelSize}
          fontWeight={labelWeight}
          mb={'0.8rem'}
          color={labelColor}
        >
          {label}
        </FormLabel>
      )}
      <AsyncPaginate
        isClearable={isClearable}
        {...register}
        handleChange={handleChange}
        onChange={onChange}
        isDisabled={isDisabled}
        debounceTimeout={1000}
        isSearchable={true}
        placeholder={placeholder}
        loadOptions={loadOptions}
        isMulti={isMulti}
        value={value}
        additional={{
          page: 1,
        }}
        {...otherProps}
        styles={{
          dropdownIndicator: (provided, _) => ({
            ...provided,
            bg: 'transparent',
            px: 2,
            cursor: 'inherit',
          }),
          indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
          }),
          option: (provided: any, state: any) => ({
            ...provided,
            background: state.isFocused ? 'rgba(255, 243, 255, 1)' : '#ffffff',
            color: state.isDisabled ? 'rgba(238, 241, 255, 1)' : 'black',
            fontSize: 'label',
          }),
          container: (provided: any) => ({
            ...provided,
            minHeight: '3.2rem',
            w: w ? w : '100%',
          }),
          control: (provided: any, state) => ({
            ...provided,
            backgroundColor: state.hasValue
              ? 'rgba(247, 242, 253, 1)'
              : 'white',
            border: '1px solid rgba(187, 196, 217, 1)',
            borderColor:
              state.hasValue || state.isFocused
                ? 'rgba(111, 9, 255, 1)'
                : 'rgba(187, 196, 217, 1)',
            borderRadius: 6,
            paddingLeft: '1rem',
            height: h ? h : '100%',
            width: '100%',
            fontSize: '1.4rem',
            boxShadow: state.isFocused
              ? '0 0 0 2px rgba(111, 9, 255, 1)'
              : null,
            _hover: {
              borderColor: state.isFocused && 'rgba(111, 9, 255, 1)',
              outline: state.isFocused && 'none',
            },
          }),
          input: (provided) => ({
            ...provided,
            color: 'black',
            fontSize: 'paragraph',
          }),
          singleValue: (provided: any) => ({
            ...provided,
            overflow: 'visible',
            fontSize: singleValueSize,
          }),
          menu: (provided: any) => ({
            ...provided,
            overflow: 'visible',
          }),
          menuList: (provided: any) => ({
            ...provided,
            height: '100%',
            width: '100%',
            minWidth: 'unset',
            fontSize: 'paragraph',
            padding: '1rem',
          }),
          valueContainer: (provided: any) => ({
            ...provided,
            padding: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: placeholderColor,
            fontSize: placeholderSize,
          }),
        }}
        closeMenuOnSelect={closeOnSelect ?? true}
      />
      {errorMessage && (
        <FormHelperText fontSize='label' color='red'>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AsyncSelect;
