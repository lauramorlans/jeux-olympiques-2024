/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Box, Typography } from '@mui/material';
import Navigation from '../Navigation';
import { getUser } from '../../actions/getUser';
import { getOffers } from '../../actions/getOffers';
import { updateBasket } from '../../actions/updateBasket';

const MainLayout = (props) => {
  const dispatch = useDispatch();

  const hasRetrievedOffers = useSelector(state => state.offers.hasRetrievedOffers);
  const offers = useSelector(state => state.offers.activeOffers);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getOffers(true));
  }, [dispatch]);

  useEffect(() => {
    if (hasRetrievedOffers) {
        const basketData = Cookies.get('basket');
        if (basketData) {
            const parsedBasket = JSON.parse(basketData);
            // Filter out inactive offers from the basket
            const activeOffers = Object.keys(parsedBasket).filter(offerId => {
                const offer = offers.find(offer => offer.id === offerId);
                return offer && offer.active === true;
            });
            // Filter the basket to keep only active offers
            const updatedBasket = Object.fromEntries(
              Object.entries(parsedBasket).filter(([key]) => activeOffers.includes(key))
            );

            // Update the basket if inactive offers were removed
            if (activeOffers.length !== Object.keys(parsedBasket).length) {
              Cookies.set('basket', JSON.stringify(updatedBasket));
              dispatch(updateBasket(updatedBasket));
            } else {
              dispatch(updateBasket(parsedBasket));
            }
        }
    }
}, [hasRetrievedOffers, dispatch, offers]);

  return (
    <React.Fragment>
      <Navigation />
        {props.children}
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 6 }}>
          Paris 2024
        </Typography>
      <Box sx={{ marginBottom: 6 }} />
    </React.Fragment>
  );
};

export default MainLayout;