import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Container } from '@mui/material';

function AccountPage() {
  const user = useSelector(state => state.user);

  return (
    <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white' }}>
      <Container maxWidth="lg" sx={{ padding: 6 }}>
        <Typography variant="h5" sx={{ marginTop: 6 }}>Bienvenue, {user?.firstname} {user?.lastname}</Typography>
      </Container>
    </Box>
  );
}

export default AccountPage;