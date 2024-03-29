import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';
import { getUser } from '../axios/getUser';

function DashboardPage() {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Container>
        <Typography variant="h6">
            Hello, {user?.name}
        </Typography>
    </Container>
  );
}

export default DashboardPage;