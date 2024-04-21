import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box, IconButton, InputLabel, Select, FormControl, MenuItem, Card, CardActions, CardContent, Container, Button, Grid, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { updateBasket } from '../actions/updateBasket';

function BasketPage() {
    const user = useSelector(state => state.user);
    const basket = useSelector(state => state.basket);
    const offers = useSelector(state => state.offers.activeOffers);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onDeleteQuantity = (offerId) => {
    const updatedBasket = {
        ...basket,
    };

    delete updatedBasket[offerId];

    // Serialize and store new basket data in a cookie
    Cookies.set('basket', JSON.stringify(updatedBasket), { expires: 7 }); // Cookie expires in 7 days
    dispatch(updateBasket(updatedBasket));
    }

  const handleQuantityChange = (offerId, quantity) => {
    const updatedBasket = {
        ...basket,
        [offerId]: quantity,
    };

    // Serialize and store new basket data in a cookie
    Cookies.set('basket', JSON.stringify(updatedBasket), { expires: 7 }); // Cookie expires in 7 days
    dispatch(updateBasket(updatedBasket));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const offerId in basket) {
        const quantity = basket[offerId];
        const offer = offers.find((offer) => offer.id.toString() === offerId.toString());

        if (offer) {
            totalPrice += offer.price * quantity;
        }
    }

    return totalPrice;
}

  const hasEmptyBasket = Object.keys(basket).length === 0;

  return (
    <Box sx={{ marginTop: 6, paddingTop: 6, paddingBottom: 6, backgroundColor: '#111111' }}>
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={7} lg={7}>
                <Grid container>
                    <Grid item xs>
                    {offers.length > 0 && Object.keys(basket)?.map((offerId) => {
                        const offer = offers.find((offer) => offer.id.toString() === offerId.toString());
                        const price = offer?.price.toFixed(2);
                        return offer && (
                            <Card key={offerId} sx={{ marginBottom: 3 }}>
                                <CardContent>
                                    <Typography variant="div" component="h2">
                                        {offer?.name}
                                    </Typography>
                                    <hr />
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <Typography variant="body1" component="div">
                                                Cette offre contient des tickets pour {offer?.includedtickets} personne{offer?.includedtickets === 1 ? '' : 's'}.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton onClick={() => onDeleteQuantity(offerId)}>
                                                <Delete />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body1"
                                                component="div"
                                            >
                                                Prix unitaire: {price}€
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={{ marginTop: 1, marginBottom: 1}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="quantity">Quantité</InputLabel>
                                                <Select
                                                    labelId="quantity"
                                                    label="Quantité"
                                                    value={basket[offerId] || ''}
                                                    onChange={(e) => handleQuantityChange(offer?.id, e.target.value)}
                                                >
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <MenuItem key={index + 1} value={index + 1}>
                                                            {index + 1}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography
                                                variant="body1"
                                                component="div"
                                                style={{ fontWeight: "bold" }}
                                            >
                                                Prix total
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6" component="div" color="secondary">
                                                {(price * basket[offerId]).toFixed(2)}€
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    })}
                    {hasEmptyBasket && (
                        <Card>
                            <CardContent>
                                <Typography variant="div" component="h2">
                                    Panier vide
                                </Typography>
                                <hr />
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component="div">
                                            Votre panier est actuellement vide.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
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
                            <Grid item xs={10}>
                                <Typography variant="body1" component="div">
                                    Total
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" component="div">
                                    {calculateTotalPrice().toFixed(2)}€
                                </Typography>
                            </Grid>
                            {!user?.id && (
                                <Typography color="text.secondary" variant="body2">
                                    {'Vous aurez besoin d\'un compte pour commander.'}
                                </Typography>
                            )}
                            {user.role === 'admin' && (
                                <Typography color="text.secondary" variant="body2">
                                    {'Votre role d\'administrateur ne vous permet pas de commander.'}
                                </Typography>
                            )}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button disabled={hasEmptyBasket || user.role === 'admin'} variant="contained" sx={{ marginLeft: 2, marginBottom: 3 }} onClick={() => user?.id ? navigate('/order') : navigate('/login')}>
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