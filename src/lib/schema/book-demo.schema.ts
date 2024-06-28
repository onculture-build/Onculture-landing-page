import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const BookDemoSchema = Yup.object().shape({
  fullname: Yup.string().trim().required('Fullname is required'),
  companyName: Yup.string().trim().required('Company name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email!')
    .required('Email is required!'),
  phone: Yup.string()
    .trim()
    .required('Phone number is required!')
    .test({
      name: 'validPhone',
      exclusive: false,
      message: 'Enter a valid phone number',
      test: function (value: any): boolean {
        if (!value) return true;
        return isValidPhoneNumber(value);
      },
    }),
  employeeCount: Yup.string()
    .trim()
    .required('Kindly specify the number of employees'),
  details: Yup.string()
    .trim()
    .required('Kindly let us know what you hope to achieve'),
});
