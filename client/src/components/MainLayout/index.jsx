/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Navigation from '../Navigation';
import { getUser } from '../../axios/getUser';

const MainLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
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