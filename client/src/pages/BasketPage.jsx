import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box, InputLabel, Select, FormControl, MenuItem, Card, CardActions, CardContent, Container, Button, Grid, Typography } from '@mui/material';
import { getOffers } from '../actions/getOffers';
import { updateBasket } from '../actions/updateBasket';

function BasketPage() {
    const [offers, setOffers] = useState([]);

    const user = useSelector(state => state.user);
    const basket = useSelector(state => state.basket);

    const navigate = useNavigate();
    const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
        const offersData = await getOffers(true);
        setOffers(offersData);
    };

    fetchData();
  }, []);

  const handleQuantityChange = (offerId, quantity) => {
    // Retrieve the current basket data from the cookie
    const currentBasketJSON = Cookies.get('basket');

    // Parse the JSON string to convert it into a JavaScript object
    const currentBasket = currentBasketJSON ? JSON.parse(currentBasketJSON) : {};

    // update basket with new quantity
    const updatedBasket = {
        ...currentBasket,
        [offerId]: quantity,
    };

    // Serialize and store basket data in a cookie
    Cookies.set('basket', JSON.stringify(updatedBasket), { expires: 7 }); // Cookie expires in 7 days
    dispatch(updateBasket(updatedBasket));
  };

  const total = 0;

  return (
    <Box sx={{ marginTop: 6, paddingTop: 6, paddingBottom: 6, backgroundColor: '#111111' }}>
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={7} lg={7}>
                <Grid container>
                    <Grid item xs>
                    {Object.keys(basket)?.map((offerId) => {
                        const offer = offers.find((offer) => offer.id.toString() === offerId.toString());
                        return offer && (
                            <Card key={offerId}>
                                <CardContent>
                                    <Typography variant="div" component="h2">
                                        {offer?.name}
                                    </Typography>
                                    <hr />
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" component="div">
                                                Cette offre contient des tickets pour {offer?.includedtickets} personne{offer?.includedtickets === 1 ? '' : 's'}.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body1"
                                                component="div"
                                            >
                                                Prix unitaire: {offer?.price}€
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} sx={{ marginTop: 1, marginBottom: 1}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="quantity">Quantité</InputLabel>
                                                <Select
                                                    labelId="quantity"
                                                    label="Quantité"
                                                    value={basket[offerId] || ''}
                                                    onChange={(e) => handleQuantityChange(offer?.id, e.target.value)}
                                                >
                                                    {Array.from({ length: 10 }, (_, index) => (
                                                        <MenuItem key={index + 1} value={index + 1}>
                                                            {index + 1}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Typography
                                                variant="body1"
                                                component="div"
                                                style={{ fontWeight: "bold" }}
                                            >
                                                Prix total
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography variant="h6" component="div" color="secondary">
                                                {offer?.price * basket[offerId]}€
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    })}
                    </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={5}>
                    <Card elevation={15}>
                    <CardContent>
                        <Typography variant="div" component="h1">
                            Mon panier
                        </Typography>
                        <hr />
                        <Grid container>
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                <Typography variant="body1" component="div">
                                    Total
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <Typography variant="h6" component="div">
                                    {total}€
                                </Typography>
                            </Grid>
                            {!user?.id && (
                                <Typography color="text.secondary" variant="body2">
                                    {'Vous aurez besoin d\'un compte pour commander.'}
                                </Typography>
                            )}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" sx={{ marginLeft: 2, marginBottom: 3 }} onClick={() => user?.id ? navigate('/order') : navigate('/login')}>
                            Commander
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </Box>
  );
}

export default BasketPage;