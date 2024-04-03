import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

function NoAccessRolePage() {
  return (
    <Container>
        <Typography variant="h6">
          {'La page que vous essayez d\'accéder ne vous est pas accessible.'}
        </Typography>
        <Link
          to="/"
      >
          Accueil
      </Link>
    </Container>
  );
}

export default NoAccessRolePage;