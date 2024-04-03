import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

function NoAccessLoginPage() {
  return (
    <Container>
        <Typography variant="h6">
          {'La page que vous essayez d\'accéder a besoin d\'un compte. Veuillez vous connecter.'}
        </Typography>
        <Link
          to="/login"
      >
          Se connecter
      </Link>
    </Container>
  );
}

export default NoAccessLoginPage;