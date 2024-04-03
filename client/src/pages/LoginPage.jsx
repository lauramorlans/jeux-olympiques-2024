import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {
    CardHeader,
    Typography,
    Card,
    CardContent,
    Stack,
    TextField,
    FormHelperText,
    Button,
} from '@mui/material';
import { signIn } from '../axios/signIn';

function LoginPage() {
    const user = useSelector(state => state.user);

    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
    if (user?.id) {
        navigate('/account');
    }
  }, [user, navigate]);

  const initialValues = {
    email: 'admin@test.com',
    password: 'Password1',
    submit: null
  };

  const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    password: Yup
        .string()
        .max(255)
        .required('Password is required')
    });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
        try {
            dispatch(signIn(values.email, values.password)).then(() => {
                navigate('/account');
            });
            } catch (err) {
            if (err.response) {
                setLoginError(err.response.data.message);
            } else {
                console.log('An error occurred:', err.message);
            }
        }
    }
  });

  return (
    <Card elevation={16}>
        <CardHeader
            subheader={(
                <Typography
                color="text.secondary"
                variant="body2"
                >
                Pas encore de compte ?
                &nbsp;
                <Link
                    to="/register"
                >
                    Créer un compte
                </Link>
                </Typography>
            )}
            sx={{ pb: 0 }}
            title="Connexion"
        />
        <CardContent>
            <form
                noValidate
                onSubmit={formik.handleSubmit}
            >
                <Stack spacing={3}>
                    {loginError && (
                    <FormHelperText
                        error
                        sx={{ mt: 3 }}
                    >
                        {loginError}
                    </FormHelperText>
                )}
                    <TextField
                        autoFocus
                        error={!!(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label="Adresse mail"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                    />
                    <TextField
                        error={!!(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Mot de passe"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                    />
                </Stack>
                {formik.errors.submit && (
                    <FormHelperText
                        error
                        sx={{ mt: 3 }}
                    >
                        {formik.errors.submit}
                    </FormHelperText>
                )}
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                >
                    Connexion
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}

export default LoginPage;
