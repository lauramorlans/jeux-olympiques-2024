import React from 'react';
import { Link, Box, Typography, Container } from '@mui/material';

function AboutPage() {
  return (
    <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white' }}>
        <Container maxWidth="lg" sx={{ padding: 6 }}>
            <Typography variant="h3">À propos</Typography>
            <Typography variant="h5" sx={{ marginTop: 6 }}>Ce site est un projet de cours, le code est accessible sur <Link href="https://github.com/lauramorlans/jeux-olympiques-2024" target="_blank" rel="noreferrer">Github</Link>.</Typography>
            <Typography variant="h5" sx={{ marginTop: 6 }}>Toutes les images sont libres de droit et trouvées sur le site <Link href="https://www.pexels.com/" target="_blank" rel="noreferrer">Pexels</Link>.</Typography>
        </Container>
    </Box>
  );
}

export default AboutPage;