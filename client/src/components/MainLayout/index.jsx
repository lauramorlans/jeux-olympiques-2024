/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Box, Typography } from '@mui/material';
import Navigation from '../Navigation';
import { getUser } from '../../actions/getUser';
import { getOffers } from '../../actions/getOffers';
import { updateBasket } from '../../actions/updateBasket';

const MainLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getOffers(true));
    const basketData = Cookies.get('basket');
    if (basketData) {
      const parsedBasket = JSON.parse(basketData);
      dispatch(updateBasket(parsedBasket));
    }
  }, [dispatch]);

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