import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Container,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { getOffers } from '../axios/getOffers';
import { postOffer } from '../axios/postOffer';
import { editOffer } from '../axios/editOffer';

function DashboardPage() {
  const user = useSelector(state => state.user);

  const [offers, setOffers] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [draftData, setDraftData] = useState({});

  const fetchOffers = async () => {
    const offersData = await getOffers();
    setOffers(offersData);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    formikEdit.setValues({
      ...draftData,
      submit: null,
    });
  }, [draftData]);

  const onHandleClose = () => {
    setCreateModal(false);
    setEditModal(false);
    setDraftData({});
  };

  const formikCreate = useFormik({
    initialValues: {
      name: '',
      price: 0,
      includedTickets: 1,
      active: true,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Nom est requis'),
      price: Yup
        .number(),
      includedTickets: Yup
        .number(),
      active: Yup
        .boolean()
    }),
    onSubmit: async (values) => {
      try {
        await postOffer({ name: values.name, price: values.price, includedTickets: values.includedTickets, active: values.active });
        onHandleClose();
        fetchOffers(); // Fetch offers again after successful creation
      } catch (err) {
        console.error(err);
      }
    }
  });

  const formikEdit = useFormik({
    initialValues: {
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Nom est requis'),
      active: Yup
        .boolean()
    }),
    onSubmit: async (values) => {
      try {
        await editOffer({ id: values.id, name: values.name, active: values.active });
        onHandleClose();
        fetchOffers(); // Fetch offers again after successful editing
      } catch (err) {
        console.error(err);
      }
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Nom',
      width: 200,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Prix',
      type: 'number',
      width: 100,
      editable: false,
      renderCell: (row) => {
        return `${row?.row?.price}€`;
      },
    },
    {
      field: 'includedtickets',
      headerName: 'Nombre de personnes',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 200,
    },
    {
      field: 'sold',
      headerName: 'Tickets vendus',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'edit',
      headerName: 'Modifier',
      width: 200,
      editable: false,
      sortable: false,
      renderCell: (row) => {
        return (
          <IconButton onClick={() => { setEditModal(true); setDraftData(row?.row) }}>
            <Edit />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ marginTop: 6, backgroundColor: '#111111', textAlign: 'center', color: 'white' }}>
        <Container maxWidth="lg" sx={{ padding: 6 }}>
          <Typography variant="h5" sx={{ marginTop: 6, marginBottom: 6 }}>Bienvenue dans votre espace administration, {user?.firstname} {user?.lastname}</Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ padding: 6 }}>
        <Typography variant="h5" sx={{ marginTop: 6, marginBottom: 6, textAlign: 'center' }}>Voici la liste des offres actuelles</Typography>
        <Typography variant="body1" sx={{ marginTop: 6, marginBottom: 6, textAlign: 'center' }}>{'Par soucis de sécurité, une fois une offre crée, seul son nom est modifiable. Vous ne pouvez pas supprimer d\'offre, mais vous pouvez la rendre inactive.'}</Typography>
        <DataGrid
          rows={offers}
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
        open={createModal}
        onClose={onHandleClose}
      >
        <DialogTitle>Créer une offre</DialogTitle>
        <DialogContent>
          <TextField
            error={!!(formikCreate.touched.name && formikCreate.errors.name)}
            fullWidth
            helperText={formikCreate.touched.name && formikCreate.errors.name}
            label="Nom"
            name="name"
            onBlur={formikCreate.handleBlur}
            onChange={formikCreate.handleChange}
            type="text"
            value={formikCreate.values.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose}>Annuler</Button>
          <Button
            disabled={formikCreate.isSubmitting}
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            onClick={formikCreate.handleSubmit}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editModal}
        onClose={onHandleClose}
      >
        <DialogTitle>Modifier offre existante</DialogTitle>
        <DialogContent>
          <TextField
            error={!!(formikEdit.touched.name && formikEdit.errors.name)}
            fullWidth
            helperText={formikEdit.touched.name && formikEdit.errors.name}
            label="Nom"
            name="name"
            onBlur={formikEdit.handleBlur}
            onChange={formikEdit.handleChange}
            type="text"
            value={formikEdit.values.name || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose}>Annuler</Button>
          <Button
            disabled={formikEdit.isSubmitting}
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            onClick={formikEdit.handleSubmit}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DashboardPage;
