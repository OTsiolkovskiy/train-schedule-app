'use client';

import { AuthService } from "@/services/auth.service";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as yup from 'yup';
import { AdminRoutes } from "../shared/routes";
import Link from "next/link";

interface InitialValuesType {
  email: string,
  password: string
};

const validationSchema = yup.object({ 
  email: yup.string()
    .strict()
    .email("Invalid Email Address!")
    .required("Email address is required!"),
  password: yup.string()
    .strict(true)
    .min(8, 'Password should be of minimum 8 characters length!')
    .required('Password cannot be empty!')
});

const SignInPage = () => {
  const initialValues: InitialValuesType = ({
    email: '',
    password: ''
  });

  const router = useRouter();

  const isShowPassword = true;

  const handleSignInWithCredential = async (initialValues: InitialValuesType) => {
    const email = initialValues.email;
    const password = initialValues.password;

    try {
        const res = await AuthService.sign_in({ email, password });
        console.log(res);
        router.push('/admin');
    } catch (error) {
        // if (error.response && error.response.status === 401) {
        //   console.log(ACCOUNT_NOT_FOUND_ERROR);
        //   setErrorMessage(ACCOUNT_NOT_FOUND_ERROR);
        // } else {
        //   console.error("An error occurred while signing in:", error);
        // }
        console.log(error);
    }
}

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link href={`/${AdminRoutes.home}`} passHref >
          Go Home
        </Link>
      </Box>


      <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleSignInWithCredential}
      >
        {({ errors, touched }: FormikProps<InitialValuesType>) => (
          // <Form>
          //   <Field 
          //     name='email'
          //     type='email'
          //     as={TextField}
          //     placeholder="Enter your email address..."
          //     error={Boolean(errors.email) && Boolean(touched.email)}
          //     helperText={Boolean(touched.email) && errors.email}
          //   />
          //   <Field 
          //     name='password'
          //     type='password'
          //     as={TextField}
          //     placeholder="Enter your password..."
          //     error={Boolean(errors.password) && Boolean(touched.password)}
          //     helperText={Boolean(touched.password) && errors.password}
          //   />
          //   <button type="submit" disabled={!dirty || !isValid}>Sign In</button>
          // </Form>
          <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Box display="flex" flexDirection="column" gap="40px">

                <Box display="flex" flexDirection="column" gap="30px">
                  <Box display="flex" flexDirection="column" gap="30px">
                    <Form>
                      <Box display="flex" flexDirection="column" gap="30px">
                        <Box display="flex" flexDirection="column" gap="15px">
                          <Typography
                            // variant="h7"
                            // color={theme.palette.textColors.medium}
                          >
                            Email
                          </Typography>

                          <Field
                            name="email"
                            type="email"
                            as={TextField}
                            className="subvariant-hovered"
                            placeholder="Enter your email address..."
                            error={Boolean(errors.email) && Boolean(touched.email)}
                            helperText={Boolean(touched.email) && errors.email}
                          />
                        </Box>

                        <Box display="flex" flexDirection="column" gap="15px">
                          <Box display="flex" justifyContent="space-between">
                            <Typography
                              // variant="h7"
                              // color={theme.palette.textColors.medium}
                            >
                              Password
                            </Typography>

                            <Typography 
                              // variant="h7"
                            >
                              <Link href='auth/recovert-account'>
                                Forgot password?
                              </Link>
                            </Typography>
                          </Box>

                          <Field
                            name="password"
                            type={isShowPassword ? 'text' : 'password'}
                            as={TextField}
                            className="subvariant-hovered"
                            placeholder="Enter your password"
                            error={Boolean(errors.password) && Boolean(touched.password)}
                            helperText={Boolean(touched.password) && errors.password}
                          />
                        </Box>

                        {/* {errorMessage && (<Alert variant="outlined" severity="error">
                          {errorMessage}
                        </Alert>)} */}

                        {/* <Box display="flex" alignItems="center">
                          <Checkbox defaultChecked sx={{ color: "#2D383D" }}/>

                          <Typography variant="body3" color={theme.palette.textColors.medium}> 
                            Keep Me Signed In
                          </Typography>
                        </Box> */}

                        <Button 
                          type="submit"
                          variant="contained"
                          // content="Sign In" 
                          style={{
                            padding: "10px 20px"
                          }} 
                          // contentVariant="button5" 
                          // isDisabled={!dirty || !isValid}
                        >
                          Submit
                        </Button>
                        <Typography 
          variant="body1">
          Already have no an Account? <Link href={`/${AdminRoutes.signUp}`}>Sign Up</Link>
        </Typography>
                      </Box>
                    </Form>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
        </Box>

        {/* <Box>
          <Box
            height="240px"
            padding="12px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="end"
          >
            <Typography variant="h7" color={theme.palette.textColors.placeholder}>
              New to Entopo?
              <StyledLink link="/auth/sign-up">Sign Up</StyledLink>
            </Typography>
          </Box>
        </Box> */}

        

      </Box>
        )}
      </Formik>
    </div>
  )
}

export default SignInPage;
