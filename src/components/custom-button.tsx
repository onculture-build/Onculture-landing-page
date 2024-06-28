import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PropType extends ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'danger-outline'
    | 'outline'
    | 'gray'
    | 'primary-outline'
    | 'gray-outline'
    | 'tertiary'
    | 'tertiary-outline';
  width?: string;
  loading?: boolean;
  style?: React.CSSProperties;
}

const CustomButton = ({
  children,
  type,
  onClick,
  disabled,
  variant = 'primary',
  width,
  loading,
  style,
  size = 'md',
  padding = '2rem',
  ...rest
}: PropType) => {
  return (
    <Button
      isLoading={loading}
      onClick={onClick}
      w={width}
      type={type}
      style={style}
      disabled={disabled ?? loading}
      isDisabled={disabled ?? loading}
      fontSize={'paragraph'}
      fontWeight='500'
      padding={padding}
      size={size}
      backgroundColor={
        !disabled && variant === 'primary'
          ? 'brand.primary.600'
          : !disabled && variant === 'primary-outline'
          ? 'transparent'
          : !disabled && variant === 'danger'
          ? 'brand.error.600'
          : !disabled && variant === 'danger-outline'
          ? 'transparent'
          : !disabled && variant === 'secondary'
          ? 'brand.secondary.600'
          : !disabled && variant === 'gray'
          ? 'brand.gray.600'
          : !disabled && variant === 'gray-outline'
          ? 'transparent'
          : !disabled && variant === 'tertiary'
          ? 'brand.success.600'
          : !disabled && variant === 'tertiary-outline'
          ? 'transparent'
          : disabled
          ? 'brand.gray.700'
          : 'transparent'
      }
      _hover={{
        color:
          variant === 'primary'
            ? 'brand.white'
            : variant === 'primary-outline'
            ? 'brand.primary.600'
            : variant === 'danger'
            ? 'brand.error.600'
            : variant === 'danger-outline'
            ? 'brand.white'
            : variant === 'secondary'
            ? 'brand.secondary.600'
            : variant === 'gray'
            ? 'brand.gray.600'
            : variant === 'gray-outline'
            ? 'brand.white'
            : variant === 'tertiary'
            ? 'brand.success.600'
            : variant === 'tertiary-outline'
            ? 'brand.white'
            : 'brand.white',
        borderColor:
          variant === 'primary'
            ? 'brand.primary.900'
            : variant === 'primary-outline'
            ? 'brand.white'
            : variant === 'danger'
            ? 'brand.error.600'
            : variant === 'danger-outline'
            ? 'brand.white'
            : variant === 'secondary'
            ? 'brand.secondary.600'
            : variant === 'gray'
            ? 'brand.gray.600'
            : variant === 'gray-outline'
            ? 'brand.white'
            : variant === 'tertiary'
            ? 'brand.success.600'
            : variant === 'tertiary-outline'
            ? 'brand.white'
            : 'brand.white',
        backgroundColor:
          variant === 'primary'
            ? 'brand.primary.800'
            : variant === 'primary-outline'
            ? 'transparent'
            : variant === 'danger'
            ? 'transparent'
            : variant === 'danger-outline'
            ? 'brand.error.600'
            : variant === 'secondary'
            ? 'transparent'
            : variant === 'gray'
            ? 'brand.gray.900'
            : variant === 'outline'
            ? 'brand.primary.600'
            : variant === 'gray-outline'
            ? 'brand.other'
            : variant === 'tertiary'
            ? 'brand.sucess.700'
            : variant === 'tertiary-outline'
            ? 'brand.success.600'
            : 'brand.other',
      }}
      color={
        variant === 'primary'
          ? 'brand.white'
          : variant === 'primary-outline'
          ? 'brand.white'
          : variant === 'danger'
          ? 'brand.white'
          : variant === 'danger-outline'
          ? 'brand.error.600'
          : variant === 'secondary'
          ? 'brand.white'
          : variant === 'gray'
          ? 'brand.gray.900'
          : variant === 'outline'
          ? 'brand.primary.600'
          : variant === 'gray-outline'
          ? 'brand.other'
          : variant === 'tertiary'
          ? 'brand.sucess.700'
          : variant === 'tertiary-outline'
          ? 'brand.success.600'
          : 'brand.other'
      }
      borderRadius={4}
      border={'2px solid transparent'}
      borderColor={
        variant === 'danger-outline'
          ? 'brand.error.600'
          : variant === 'primary-outline'
          ? 'brand.white'
          : variant === 'outline'
          ? 'brand.primary.600'
          : variant === 'gray-outline'
          ? 'brand.other'
          : variant === 'tertiary-outline'
          ? 'brand.success.600'
          : ''
      }
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
