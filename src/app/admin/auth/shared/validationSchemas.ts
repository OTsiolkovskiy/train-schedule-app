import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup.string()
    .strict()
    .required('Full name cannot be empty!'),
  email: yup.string()
    .email("Invalid Email Address!")
    .required("Email address is required!"),
  password: yup.string()
    .min(8, 'Password should be of minimum 8 characters length!')
    .required('Password cannot be empty!'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required!')
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .strict()
    .email("Invalid Email Address!")
    .required("Email address is required!"),
  password: yup
    .string()
    .strict(true)
    .min(8, "Password should be of minimum 8 characters length!")
    .required("Password cannot be empty!"),
});
