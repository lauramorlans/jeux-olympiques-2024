import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { getOffers } from './queries/getOffers';
import './App.css';
import TopHeader from './components/TopHeader';

function App() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const offersData = await getOffers();
      setOffers(offersData);
    };

    fetchData();
  }, []);

  return (
    <React.StrictMode>
        <TopHeader />
        <Container>
          <Typography variant="h6">
            Here are the offers:
          </Typography>
          <Grid container spacing={3}>
            {offers && offers?.map((offer) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {offer?.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {offer?.price} euros
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
    </React.StrictMode>
  );
}

export default App;
