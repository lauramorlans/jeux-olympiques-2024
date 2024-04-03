import React, { useEffect, useState } from 'react';
import { CardMedia, Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { getOffers } from '../axios/getOffers';
import sprint from '../images/sprint.jpg';

function HomePage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await getOffers();
      setOffers(offersData);
    };

    fetchData();
  }, []);

  return (
    <Box>
        <div style={{ position: "relative" }}>
            <CardMedia style={{ width: '100%', marginBottom: '20px', borderBottomLeftRadius: '7rem' }} component="img" image={sprint} title="Sprint" alt="Sprint"/> 
            <div style={{ position: "absolute", color: "white", top: 10, left: "20%" }}><Typography variant="h1" sx={{ fontSize: '5rem' }}>Paris 2024</Typography></div>
        </div>
        <Container>
            <Typography variant="h6">
                Here are the offers:
            </Typography>
            <Grid container spacing={3}>
                {offers && offers?.map((offer) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={offer?.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {offer?.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {offer?.price} euros
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    </Box>
  );
}

export default HomePage;
