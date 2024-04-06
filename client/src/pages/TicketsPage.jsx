import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Button, Typography, Container } from '@mui/material';
import { getOffers } from '../axios/getOffers';

function TicketsPage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await getOffers();
      setOffers(offersData);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ marginTop: 6, backgroundColor: '#111111' }}>
        <Container maxWidth="lg" sx={{ padding: 6 }}>
            <Typography variant="h3" sx={{ textAlign: 'center', color: 'white' }}>
                Découvrez notre billeterie
            </Typography>
            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 6, marginTop: 6, color: 'white' }}>
                {'Explorez une diversité de billets pour les Jeux Olympiques, vous permettant d\'accéder à une multitude d\'événements passionnants et de vivre l\'excitation du sport mondial en direct'}
            </Typography>
            <Grid container spacing={5} justifyContent="center">
                {offers && offers?.map((offer) => {
                    return (
                        <Grid item xs={12} sm={3} key={offer?.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {offer?.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {offer?.price}€ - {offer?.includedtickets} personne{offer?.includedtickets === 1 ? '' : 's'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                <Button variant="contained" onClick={() => {}}>Réserver</Button>
            </Box>
        </Container>
    </Box>
  );
}

export default TicketsPage;