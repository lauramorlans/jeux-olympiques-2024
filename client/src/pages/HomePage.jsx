import React, { useEffect, useState } from 'react';
import {
    Button,
    CardMedia,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { getOffers } from '../axios/getOffers';
import olympic from '../images/olympic.jpg';
import horse from '../images/horse.jpg';
import sprint from '../images/sprint.jpg';
import pool from '../images/pool.jpg';

function HomePage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await getOffers();
      setOffers(offersData);
    };

    fetchData();
  }, []);

  const mainEvents = [
    { name: 'Saut d\'obstacles', description: 'L\'épreuve de saut d\'obstacles aux Jeux Olympiques est un spectacle époustouflant de grâce et de force, où cavaliers et chevaux défient des obstacles imposants avec agilité et précision, sous les yeux captivés du public.', image: horse },
    { name: 'Sprint', description: 'Au sprint olympique, les athlètes explosent avec une puissance incroyable, propulsant leur corps vers la ligne d\'arrivée dans une course effrénée. Chaque seconde compte dans cette lutte effervescente pour la médaille d\'or.', image: sprint },
    { name: 'Natation', description: 'Dans les piscines des Jeux Olympiques, la natation est une bataille d\'élégance et de puissance. Les nageurs fendre l\'eau avec grâce, chaque coup de bras, chaque battement de pied les rapproche un peu plus de la victoire.', image: pool },
  ];

  return (
    <Box>
        <div style={{ position: "relative" }}>
            <CardMedia style={{ width: '100%', marginBottom: '20px', borderBottomRightRadius: '7rem' }} component="img" image={olympic} title="Jeux Olympiques" alt="Sprint"/> 
            <div style={{ position: "absolute", color: "white", top: 10, left: "10%" }}><Typography variant="h1" sx={{ fontSize: '20vw' }}>Paris 2024</Typography></div>
        </div>
        <Box sx={{ marginTop: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                    Les épreuves phares
                </Typography>
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 6, marginTop: 6 }}>
                    {'Explorez les épreuves légendaires des Jeux Olympiques, où la virtuosité athlétique rencontre l\'excellence technique pour créer des moments de pure magie sportive'}
                </Typography>
                <Grid container spacing={5} justifyContent="center">
                    {mainEvents.map((event, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={event?.image}
                                        alt={event?.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {event?.name}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {event?.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
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
                                            {offer?.price}€ - {offer?.includedtickets} personne(s)
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
    </Box>
  );
}

export default HomePage;
