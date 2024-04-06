import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';

function AccountPage() {
  const user = useSelector(state => state.user);

  return (
    <Container>
        <Typography variant="h6">
          Bienvenue, {user?.username}
        </Typography>
        {user?.role === 'admin' && (
          <Link
              to="/dashboard"
          >
            Espace Admin
          </Link>
        )}
    </Container>
  );
}

export default AccountPage;