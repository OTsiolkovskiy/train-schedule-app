'use client';

import { Formik, Field, Form } from 'formik';
import { Box, TextField, Typography, Button, InputAdornment, IconButton, Grid } from '@mui/material';
import { useSignUp } from '../hooks/useSignUp';
import { signUpSchema } from '../shared/validationSchemas';
import Link from 'next/link';
import { AdminRoutes } from '../shared/routes';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import adminTheme from '@/styles/themes/adminTheme';

const SignUp = () => {
  const { signUp, loading, error } = useSignUp();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(prev => !prev);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: adminTheme.palette.background.default,
        padding: { xs: "20px", sm: "40px" }
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
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
                <Box display="flex" flexDirection="column" gap="1.5rem">
                  <Typography variant="h4" color="white" align="center">Create Account</Typography>

                  {error && <Typography color="error" align="center">{error}</Typography>}

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
                    type={isShowPassword ? "text" : "password"}
                    as={TextField}
                    label="Password"
                    placeholder="Enter your password"
                    error={Boolean(errors.password) && Boolean(touched.password)}
                    helperText={Boolean(touched.password) && errors.password}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Field
                    name="confirmPassword"
                    type={isShowConfirmPassword ? "text" : "password"}
                    as={TextField}
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                    helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                          >
                            {isShowConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid ? !dirty : loading}
                    style={{
                      padding: "10px 20px",
                    }}
                  >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </Button>

                  <Box display="flex" justifyContent="center">
                    <Typography variant="body1">
                      Already have an Account? 
                      <Link 
                        href={`/${AdminRoutes.signIn}`}
                        style={{
                          color: adminTheme.palette.textColors.medium,
                          marginLeft: '5px',
                        }}
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;