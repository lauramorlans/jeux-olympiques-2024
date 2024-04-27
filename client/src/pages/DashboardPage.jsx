import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { postOffer } from '../actions/postOffer';
import { editOffer } from '../actions/editOffer';
import { getOffers } from '../actions/getOffers';

function DashboardPage() {
  const user = useSelector(state => state.user);
  const offers = useSelector(state => state.offers.allOffers);

  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const onHandleClose = () => {
    setCreateModal(false);
    setEditModal(false);
    formikCreate.resetForm();
    formikEdit.resetForm();
    dispatch(getOffers());
    dispatch(getOffers(true));
  };

  const formikCreate = useFormik({
    initialValues: {
      name: '',
      price: 0,
      includedtickets: 1,
      active: true,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Nom est requis'),
      price: Yup
        .number()
        .min(0, 'Le prix doit être au moins 0'),
      includedtickets: Yup
        .number()
        .min(1, 'Le nombre de tickets inclus doit être au moins 1'),
      active: Yup
        .boolean()
    }),
    onSubmit: async (values) => {
      try {
        await postOffer({ name: values.name, price: values.price, includedtickets: values.includedtickets, active: values.active });
        onHandleClose();
      } catch (err) {
        console.error(err);
      }
    }
  });

  const formikEdit = useFormik({
    initialValues: {
      id: '',
      name: '',
      price: 0,
      includedtickets: 1,
      active: false,
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
        return `${row?.row?.price.toFixed(2)}€`;
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
      field: 'ticket_count',
      headerName: 'Tickets vendus',
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
          <IconButton onClick={() => { 
            formikEdit.setValues({
              id: row.row.id,
              name: row.row.name,
              active: row.row.active,
              submit: null,
            });
            setEditModal(true);
          }}>
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
      <Container maxWidth="lg" sx={{ padding: 6, textAlign: 'center'  }}>
        <Typography variant="h5" sx={{ marginTop: 6, marginBottom: 6 }}>Liste des offres</Typography>
        <Typography variant="body1" sx={{ marginTop: 6, marginBottom: 6 }}>{'Par soucis de sécurité, une fois une offre crée, seul son nom est modifiable. Vous ne pouvez pas supprimer d\'offre, mais vous pouvez la rendre inactive.'}</Typography>
        <Button
            variant="contained"
            onClick={() => setCreateModal(true)}
            sx={{ marginBottom: 6 }}
          >
            Créer une offre
          </Button>
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
        fullWidth
        maxWidth="xs"
      >
        <form
          noValidate
          onSubmit={formikCreate.handleSubmit}
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
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <TextField
              error={!!(formikCreate.touched.price && formikCreate.errors.price)}
              fullWidth
              helperText={formikCreate.touched.price && formikCreate.errors.price}
              label="Prix"
              name="price"
              onBlur={formikCreate.handleBlur}
              onChange={formikCreate.handleChange}
              type="number"
              value={formikCreate.values.price}
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <TextField
              error={!!(formikCreate.touched.includedtickets && formikCreate.errors.includedtickets)}
              fullWidth
              helperText={formikCreate.touched.includedtickets && formikCreate.errors.includedtickets}
              label="Tickets inclus"
              name="includedtickets"
              onBlur={formikCreate.handleBlur}
              onChange={formikCreate.handleChange}
              type="number"
              value={formikCreate.values.includedtickets}
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <FormControlLabel
              label="Active"
              control={
                <Switch
                  name="active"
                  checked={formikCreate.values.active}
                  onChange={(event) => {
                    formikCreate.handleChange(event);
                  }}
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onHandleClose}>Annuler</Button>
            <Button
              disabled={formikCreate.isSubmitting}
              type="submit"
              variant="contained"
              onClick={formikCreate.handleSubmit}
            >
              Sauvegarder
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={editModal}
        onClose={onHandleClose}
        fullWidth
        maxWidth="xs"
      >
        <form
          noValidate
          onSubmit={formikEdit.handleSubmit}
        >
          <DialogTitle>Modifier offre existante</DialogTitle>
          <DialogContent sx={{ marginTop: 1, marginBottom: 1 }}>
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
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <FormControlLabel
              label="Active"
              control={
                <Switch
                  name="active"
                  checked={formikEdit.values.active}
                  onChange={(event) => {
                    formikEdit.handleChange(event);
                  }}
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onHandleClose}>Annuler</Button>
            <Button
              disabled={formikEdit.isSubmitting}
              type="submit"
              variant="contained"
              onClick={formikEdit.handleSubmit}
            >
              Sauvegarder
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default DashboardPage;
