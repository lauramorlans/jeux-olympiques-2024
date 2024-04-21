import React, { useState } from 'react';
import { Box, Button, Container, Typography, Card, CardContent, TextField, Stack, CircularProgress } from '@mui/material';
import Cards from 'react-credit-cards-2';
import QRCode from "react-qr-code";
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const onConfirmOrder = () => {
    setIsLoading(true);
    setOrderConfirmed(true);
    setIsLoading(false);
  }

  return (
    <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white', padding: 6 }}>
      <Container maxWidth="lg">
        <Card elevation={15}>
          {isLoading ? (
            <CardContent>
              <CircularProgress />
              <Typography variant="div" component="h1" sx={{ marginTop: 3, marginBottom: 3 }}>
                Payement en cours, merci de patienter
              </Typography>
            </CardContent>
          ) : (
            <>
              {orderConfirmed ? (
                <CardContent>
                  <Typography variant="div" component="h1" sx={{ marginBottom: 3 }}>
                    Commande confirmée
                  </Typography>
                  <QRCode
                    value="test"
                  />
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                    onClick={() => navigate('/account')}
                  >
                    {'Historique d\'achat'}
                  </Button>
                </CardContent>
              ) : (
                <CardContent>
                  <Typography variant="div" component="h1" sx={{ marginBottom: 3 }}>
                    Payement
                  </Typography>
                  <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                  />
                  <Stack spacing={3} sx={{ marginTop: 3 }}>
                    <TextField
                      fullWidth
                      label="Titulaire"
                      name="name"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                    <TextField
                      fullWidth
                      label="Numéro"
                      name="number"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      type="number"
                    />
                    <TextField
                      fullWidth
                      label="Date d'expiration"
                      name="expiry"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      type="number"
                    />
                    <TextField
                      fullWidth
                      label="CVC"
                      name="cvc"
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      type="number"
                    />
                  </Stack>
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                    onClick={onConfirmOrder}
                  >
                    Payer
                  </Button>
                </CardContent>
              )}
            </>
          )}
        </Card>
      </Container>
    </Box>
  );
}

export default OrderPage;