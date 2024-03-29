import React from 'react';
import { Container } from '@mui/material';
import Navigation from '../Navigation';

const MainLayout = (props) => {
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