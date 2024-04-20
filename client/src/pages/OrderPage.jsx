import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function OrderPage() {


  return (
    <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white' }}>
      <Container maxWidth="lg" sx={{ padding: 6 }}>
          <Typography variant="h3">Payement</Typography>
      </Container>
    </Box>
  );
}

export default OrderPage;