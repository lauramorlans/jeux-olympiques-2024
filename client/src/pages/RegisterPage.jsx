import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { postUser } from '../actions/postUser';

function RegisterPage() {
    const [accountCreated, setAccountCreated] = useState(false);

    const user = useSelector(state => state.user);

    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        if (user?.id) {
            navigate(user?.role === 'admin' ? '/dashboard' : '/account');
        }
    }, [user, navigate]);

  const initialValues = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    submit: null
  };

  const validationSchema = Yup.object({
    username: Yup
        .string()
        .max(255)
        .required('Nom d\'utilisateur est requis'),
    firstname: Yup
        .string()
        .max(255)
        .required('Prénom est requis'),
    lastname: Yup
        .string()
        .max(255)
        .required('Nom de famille est requis'),
    email: Yup
        .string()
        .email('L\'email doit être valide')
        .max(255)
        .required('L\'email est requis'),
    password: Yup
        .string()
        .max(255)
        .min(7, 'Mot de passe doit contenir 7 caractères minimum')
        .matches(
          /^(?=.*[A-Z])(?=.*\d)/,
          'Mot de passe doit contenir au moins une majuscule et un chiffre'
        )
        .required('Mot de passe est requis')
    });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await postUser(values.username, values.firstname, values.lastname, values.email, values.password);
        setAccountCreated(true);
      } catch (err) {
        console.error(err);
      }
    }
  });

  return (
    <Box sx={{ padding: isMobile ? 4 : 12, backgroundColor: '#111111' }}>
        {accountCreated ? (
            <Container maxWidth="lg" sx={{ padding: 6, color: 'white', textAlign: 'center' }}>
                <Typography variant="h3">Bravo !</Typography>
                <Typography variant="h5" sx={{ marginTop: 6, marginBottom: 6 }}>
                    {'Votre compte a été crée.'}
                </Typography>
                <Link
                    component="button"
                    variant="h5"
                    onClick={() => navigate('/login')}
                >
                    Se connecter
                </Link>
            </Container>
        ) : (
            <>
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 6, color: 'white' }}>
                    {'Accédez à l\'épicentre de l\'excitation olympique en créant un compte dès maintenant, et réservez vos tickets pour vivre l\'intensité des Jeux Olympiques comme jamais auparavant !'}
                </Typography>
                <Container maxWidth="sm">
                    <Card elevation={16}>
                        <CardHeader
                            subheader={(
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                    >
                                    Vous avez déjà un compte ?
                                    &nbsp;
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => navigate('/login')}
                                    >
                                        Se connecter
                                    </Link>
                                </Typography>
                            )}
                            sx={{ pb: 0 }}
                            title="Créer un compte"
                        />
                        <CardContent>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack spacing={3}>
                                    <TextField
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
                                        error={!!(formik.touched.firstname && formik.errors.firstname)}
                                        fullWidth
                                        helperText={formik.touched.firstname && formik.errors.firstname}
                                        label="Prénom"
                                        name="firstname"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.firstname}
                                    />
                                    <TextField
                                        error={!!(formik.touched.lastname && formik.errors.lastname)}
                                        fullWidth
                                        helperText={formik.touched.lastname && formik.errors.lastname}
                                        label="Nom de famille"
                                        name="lastname"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.lastname}
                                    />
                                    <TextField
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
                                    Créer un compte
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </>
        )}
    </Box>
  );
}

export default RegisterPage;
