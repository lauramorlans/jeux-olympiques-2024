/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
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
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {props.children}
      </Container>
    </React.Fragment>
  );
};

export default MainLayout;