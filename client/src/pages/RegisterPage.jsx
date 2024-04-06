import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
    Link,
    Box,
    Container,
    CardHeader,
    Typography,
    Card,
    CardContent,
    Stack,
    TextField,
    FormHelperText,
    Button,
    useMediaQuery,
} from '@mui/material';
import { signIn } from '../axios/signIn';

function RegisterPage() {
    const user = useSelector(state => state.user);

    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
    if (user?.id) {
        navigate('/account');
    }
  }, [user, navigate]);

  const initialValues = {
    username: 'admin',
    password: 'Password1',
    submit: null
  };

  const validationSchema = Yup.object({
    username: Yup
        .string()
        .max(255)
        .required('Nom d\'utilisateur est requis'),
    password: Yup
        .string()
        .max(255)
        .required('Mot de passe est requis')
    });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
        dispatch(signIn(values.username, values.password)).then((error) => {
            if (error) {
                setLoginError(error)
            } else {
                navigate('/account');
            }
        });
    }
  });

  return (
    <Box sx={{ padding: isMobile ? 4 : 12, backgroundColor: '#111111' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 6, color: 'white' }}>
          {'Accédez à l\'épicentre de l\'excitation olympique en créant un compte ou en vous connectant dès maintenant, et réservez vos tickets pour vivre l\'intensité des Jeux Olympiques comme jamais auparavant !'}
        </Typography>
        <Container maxWidth="sm">
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
                                component="button"
                                variant="body2"
                                onClick={() => navigate('/register')}
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
                            <FormHelperText error>
                                {loginError}
                            </FormHelperText>
                        )}
                            <TextField
                                autoFocus
                                error={!!(formik.touched.username && formik.errors.username)}
                                fullWidth
                                helperText={formik.touched.username && formik.errors.username}
                                label="Nom d'utilisateur"
                                name="username"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.username}
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
        </Container>
    </Box>
  );
}

export default RegisterPage;
