'use client';

import { Formik, Field, Form } from 'formik';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useSignUp } from '../hooks/useSignUp';
import { signUpSchema } from '../shared/validationSchemas';
import Link from 'next/link';
import { AdminRoutes } from '../shared/routes';

const SignUp = () => {
  const { signUp, loading, error } = useSignUp();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <Box sx={{ margin: "auto", height: "100vh", width: "50vw"}}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          const { name, email, password } = values;
          signUp({ name, email, password });
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap="1.5rem" sx={{ width: '100%' }}>
              <Typography variant="h4" color="white">Create Account</Typography>

              {error && <Typography color="red">{error}</Typography>}

              <Field
                name="name"
                type="text"
                as={TextField}
                label="Full Name"
                placeholder="Enter your full name"
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(touched.name) && errors.name}
                fullWidth
              />

              <Field
                name="email"
                type="email"
                as={TextField}
                label="Email"
                placeholder="Enter your email"
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
                fullWidth
              />

              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                placeholder="Enter your password"
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
                fullWidth
              />

              <Field
                name="confirmPassword"
                type="password"
                as={TextField}
                label="Confirm Password"
                placeholder="Confirm your password"
                error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid ? !dirty : loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>

              <Typography variant="body1">
                Already have an Account? <Link href={`/${AdminRoutes.signIn}`}>Sign In</Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;