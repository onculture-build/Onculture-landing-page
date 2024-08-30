import { extendTheme, theme } from '@chakra-ui/react';
import { COLORS } from './colors';

const colors = Object.freeze({
  bg: {
    white: COLORS.white,
  },
  brand: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    black: COLORS.black,
    gray: COLORS.gray,
    white: COLORS.white,
    error: COLORS.error,
    other: COLORS.other,
    success: COLORS.success,
  },
});

const fontSizes = Object.freeze({
  ...theme.fontSizes,
  small: '1.2rem',
  label: '1.4rem',
  paragraph: '1.6rem',
  heading6: '1.6rem',
  heading5: '1.9rem',
  heading4: '2.4rem',
  heading3: '2.9rem',
  heading2: '3.5rem',
  heading1: '4.3rem',
});

const fontWeights = Object.freeze({
  ...theme.fontWeights,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  bolder: 800,
  extraBold: 900,
});

const breakpoints = Object.freeze({
  '2xs': 320,
  xs: 375,
  sm: 530,
  md: 840,
  lg: 1024,
  xl: 1200,
  '2xl': 1600,
  '3xl': 1900,
});

const styles = Object.freeze({
  global: {
    html: {
      fontSize: '62.5%',
    },
    body: {
      fontFamily: "'Inter', sans-serif",
      color: COLORS.black[900],
      backgroundColor: 'brand.white',
      fontSize: '1.6rem',
      lineHeight: 1.5,
      fontWeight: fontWeights.regular,
    },
    '*, *::before, *::after': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
  },
});

export default extendTheme({
  breakpoints,
  colors,
  styles,
  fontWeights,
  fontSizes,
});
