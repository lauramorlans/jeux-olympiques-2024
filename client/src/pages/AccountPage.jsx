import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { DialogTitle, IconButton, Box, Typography, Container, Dialog } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Ticket from '../components/Ticket';
import { getOrders } from '../actions/getOrders';

function AccountPage() {
  const [viewOrder, setViewOrder] = useState({});

  const user = useSelector(state => state.user);
  const orders = useSelector(state => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(getOrders(user?.id));
    }
  }, [dispatch, user?.id]);

  const columns = [
    { field: 'number', headerName: 'Order number', width: 200 },
    {
      field: 'tickets',
      headerName: 'Tickets',
      width: 200,
      renderCell: (row) => {
        return Object.keys(row?.row?.tickets).length;
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      renderCell: (row) => {
        return new Date(row?.row?.date).toLocaleDateString('en-GB');
      },
    },
    {
      field: 'view',
      headerName: 'Voir',
      width: 200,
      renderCell: (row) => {
        return (
          <IconButton onClick={() => setViewOrder(row?.row)}>
            <Visibility />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white' }}>
        <Container maxWidth="lg" sx={{ padding: 6 }}>
          <Typography variant="h5" sx={{ marginTop: 6 }}>Bienvenue, {user?.firstname} {user?.lastname}</Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ padding: 6, textAlign: 'center'  }}>
        <Typography variant="h5" sx={{ marginTop: 6, marginBottom: 6 }}>{'Historique d\'achats'}</Typography>
        <Typography variant="body1" sx={{ marginTop: 6, marginBottom: 6 }}>{'Vous pouvez retrouver la liste de vos commandes, ainsi que les tickets affiliés.'}</Typography>
        <DataGrid
          rows={Object.values(orders)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Container>
      <Dialog
        open={Object.keys(viewOrder).length > 0}
        onClose={() => setViewOrder({})}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Commande #{viewOrder?.number}</DialogTitle>
        <Box sx={{ textAlign: 'center' }}>
          {viewOrder && viewOrder.tickets && Object.keys(viewOrder.tickets).map((ticket) => {
            return (
              <Box key={ticket} sx={{ marginBottom: 3 }}>
                <Ticket ticket={ticket} />
              </Box>
            )
          })}
        </Box>
      </Dialog>
    </>
  );
}

export default AccountPage;