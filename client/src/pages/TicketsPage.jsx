import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    Typography,
    Container,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from '@mui/material';
import { getOffers } from '../axios/getOffers';

function TicketsPage() {
  const [offers, setOffers] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await getOffers(true);
      setOffers(offersData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const initQuantities = {};
    offers.forEach(offer => {
      initQuantities[offer.id] = 1;
    });
    setQuantities(initQuantities);
  }, [offers]);

  const handleQuantityChange = (offerId, quantity) => {
    setQuantities({ ...quantities, [offerId]: quantity });
  };

  const addTicketToBasket = (offerId) => {
    // Retrieve the current basket data from the cookie
    const currentBasketJSON = Cookies.get('basket');

    // Parse the JSON string to convert it into a JavaScript object
    const currentBasket = currentBasketJSON ? JSON.parse(currentBasketJSON) : {};

    // update basket with more quantities
    const updatedBasket = {
        ...currentBasket,
        [offerId]: (currentBasket[offerId] || 0) + quantities[offerId]
    };
    // Serialize and store basket data in a cookie
    Cookies.set('basket', JSON.stringify(updatedBasket), { expires: 7 }); // Cookie expires in 7 days
  };

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
                                    <FormControl fullWidth sx={{ marginTop: 3 }}>
                                        <InputLabel id="quantity">Nombre de tickets</InputLabel>
                                        <Select
                                            labelId="quantity"
                                            label="Nombre de tickets"
                                            value={quantities[offer?.id] || ''}
                                            onChange={(e) => handleQuantityChange(offer?.id, e.target.value)}
                                        >
                                            {Array.from({ length: 10 }, (_, index) => (
                                                <MenuItem key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button fullWidth variant="contained" onClick={() => addTicketToBasket(offer?.id)} sx={{ marginTop: 3 }}>Ajouter au panier</Button>
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

export default TicketsPage;