import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { updateBasket } from '../actions/updateBasket';

function TicketsPage() {
  const [quantities, setQuantities] = useState({});

  const offers = useSelector(state => state.offers.activeOffers);
  const basket = useSelector(state => state.basket);

  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve basket data from cookie when component mounts
    const basketData = Cookies.get('basket');
    if (basketData) {
        const parsedBasket = JSON.parse(basketData);
        setQuantities(parsedBasket);
    }
  }, []);

  const handleQuantityChange = (offerId, quantity) => {
    setQuantities({ ...quantities, [offerId]: quantity });
  };

  const updateQuantityBasket = (offerId) => {
    // update basket with more quantities
    const updatedBasket = {
        ...basket,
        [offerId]: quantities[offerId] || 1,
    };

    // Serialize and store basket data in a cookie
    Cookies.set('basket', JSON.stringify(updatedBasket), { expires: 7 }); // Cookie expires in 7 days
    dispatch(updateBasket(updatedBasket));
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
                                        {offer?.price.toFixed(2)}€ - {offer?.includedtickets} personne{offer?.includedtickets === 1 ? '' : 's'}
                                    </Typography>
                                    <FormControl fullWidth sx={{ marginTop: 3 }}>
                                        <InputLabel id="quantity">Nombre de tickets</InputLabel>
                                        <Select
                                            labelId="quantity"
                                            label="Nombre de tickets"
                                            value={quantities[offer?.id] || 1}
                                            onChange={(e) => handleQuantityChange(offer?.id, e.target.value)}
                                        >
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <MenuItem key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button fullWidth variant="contained" onClick={() => updateQuantityBasket(offer?.id)} sx={{ marginTop: 3 }}>Ajouter au panier</Button>
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