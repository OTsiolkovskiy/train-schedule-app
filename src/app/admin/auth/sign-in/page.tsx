"use client";

import { AuthService } from "@/services/auth.service";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { AdminRoutes } from "../shared/routes";
import Link from "next/link";
import { useState } from "react";
import adminTheme from "@/styles/themes/adminTheme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInSchema } from "../shared/validationSchemas";

interface InitialValuesType {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const initialValues: InitialValuesType = {
    email: "",
    password: "",
  };

  const router = useRouter();

  const handleSignInWithCredential = async (
    initialValues: InitialValuesType
  ) => {
    const email = initialValues.email;
    const password = initialValues.password;

    try {
      await AuthService.sign_in({ email, password });
      router.push("/admin");
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword(prev => !prev);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={handleSignInWithCredential}
      >
        {({ errors, touched }: FormikProps<InitialValuesType>) => (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <Box display="flex" flexDirection="column" gap="40px">
                    <Box display="flex" flexDirection="column" gap="30px">
                      <Box display="flex" flexDirection="column" gap="30px">
                        <Form>
                          <Box display="flex" flexDirection="column" gap="30px">
                            <Box
                              display="flex"
                              flexDirection="column"
                              gap="15px"
                            >
                              <Typography>Email</Typography>

                              <Field
                                name="email"
                                type="email"
                                as={TextField}
                                className="subvariant-hovered"
                                placeholder="Enter your email address..."
                                error={
                                  Boolean(errors.email) &&
                                  Boolean(touched.email)
                                }
                                helperText={
                                  Boolean(touched.email) && errors.email
                                }
                              />
                            </Box>

                            <Box
                              display="flex"
                              flexDirection="column"
                              gap="15px"
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Typography>Password</Typography>
                              </Box>

                              <Field
                                name="password"
                                type={isShowPassword ? "text" : "password"}
                                as={TextField}
                                className="subvariant-hovered"
                                placeholder="Enter your password"
                                error={
                                  Boolean(errors.password) &&
                                  Boolean(touched.password)
                                }
                                helperText={
                                  Boolean(touched.password) && errors.password
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                      >
                                        {isShowPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>

                            {errorMessage && (
                              <Typography color="red">
                                {errorMessage}
                              </Typography>
                            )}

                            <Button
                              type="submit"
                              variant="contained"
                              style={{
                                padding: "10px 20px",
                              }}
                            >
                              Sign In
                            </Button>
                            <Box display="flex" justifyContent="center">
                              <Typography variant="body1">
                                Already have no an Account?{" "}
                                <Link
                                  href={`/${AdminRoutes.signUp}`}
                                  style={{
                                    color: adminTheme.palette.textColors.medium,
                                  }}
                                >
                                  Sign Up
                                </Link>
                              </Typography>
                            </Box>
                          </Box>
                        </Form>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default SignInPage;
