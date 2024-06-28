import { useRef, CSSProperties, useEffect, FunctionComponent } from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputProps,
  TextareaProps,
  SelectProps,
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-number-input';
import { Controller } from 'react-hook-form';
import themes from '@@utils/lib/constants/theme';
import 'react-phone-number-input/style.css';

interface PropType {
  label?: string;
  isRequired?: boolean;
  isPhone?: boolean;
  control?: any;
  id?: string;
  errorMessage?: string;
  register?: any;
  disabled?: boolean;
  isCheckbox?: boolean;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  isHorizontal?: boolean;
  onGetRef?: (ref: HTMLInputElement) => void;
  tooltip?: string;
}

interface InputType extends PropType, InputProps {
  defaultValue?: string;
}
interface SelectType extends PropType, SelectProps {
  defaultValue?: string;
  type?: string;
}
interface TextareaType extends PropType, TextareaProps {
  defaultValue?: string;
  type?: string;
}

export const generalStyle = {
  height: '4.1rem',
  backgroundColor: '#FCFCFC',
  border: '0.4px solid rgba(15, 99, 255, 0.08)',
  borderRadius: '4px',
  color: '#000',
  fontSize: themes.fontSizes.label,
  fontWeight: themes.fontWeights.regular,
  zIndex: 0,
  paddingLeft: '3px',
};

export const focusStyle = {
  outlineColor: 'rgba(210, 205, 205, .8)',
  outlineStyle: 'solid',
  outlineWidth: '1px',
  border: 'none',
};

const CustomPhoneInput: FunctionComponent<
  InputType | SelectType | TextareaType
> = (props) => {
  const {
    label,
    placeholder,
    isRequired,
    id,
    errorMessage,
    type,
    register,
    onChange,
    value,
    h,
    w,
    disabled,
    isCheckbox,
    fontSize,
    isHorizontal,
    isPhone,
    style,
    control,
    onGetRef,
    labelStyle,
    defaultValue,
    tooltip,
    ...otherProps
  } = props;
  const baseInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //@ts-ignore
    onGetRef?.(baseInputRef);
  }, [baseInputRef, onGetRef]);

  return (
    <FormControl
      isRequired={isRequired && isRequired}
      style={style}
      display={isHorizontal ? 'flex' : 'block'}
      alignItems={isHorizontal ? 'center' : 'flex-start'}
      justifyContent={isHorizontal ? 'flex-start' : 'flex-start'}
    >
      {label && (
        <FormLabel
          htmlFor={id}
          fontSize={themes.fontSizes.paragraph}
          fontWeight={themes.fontWeights.bold}
          mb={!isCheckbox ? '0.8rem' : ''}
          color='typography.gray'
          style={labelStyle}
        >
          {label}
        </FormLabel>
      )}
      {isPhone && (
        <Controller
          name={id ? id : ''}
          control={control}
          render={({
            field: { onChange: onPhoneChange, value: phoneValue },
          }) => (
            <PhoneInput
              id={id}
              onChange={onPhoneChange}
              value={phoneValue}
              defaultValue={defaultValue}
              defaultCountry='NG'
              style={{ ...generalStyle }}
            />
          )}
        />
      )}
      {errorMessage && (
        <FormHelperText fontSize='1rem' color='red'>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomPhoneInput;
