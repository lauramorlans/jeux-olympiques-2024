import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Link, Typography, Container } from '@mui/material';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white' }}>
      <Container maxWidth="lg" sx={{ padding: 6 }}>
          <Typography variant="h3">Page non trouvée</Typography>
          <Typography variant="h5" sx={{ marginTop: 6, marginBottom: 6 }}>
            {'La page que vous essayez d\'accéder n\'existe pas.'}
          </Typography>
          <Link
            component="button"
            variant="h5"
            onClick={() => navigate('/')}
          >
            Accueil
          </Link>
      </Container>
    </Box>
  );
}

export default NotFoundPage;