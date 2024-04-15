import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Stack, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Popover, Paper, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ShoppingBasket, Info, Home, Menu, ConfirmationNumber, AccountCircle } from '@mui/icons-material';
import { neutral, purple } from '../../theme/colors'; 
import { logout } from '../../axios/logout';
import logo from './logo.png';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [basket, setBasket] = useState({});

  const user = useSelector(state => state.user);

  useEffect(() => {
    // Retrieve basket data from cookie when component mounts
    const basketData = Cookies.get('basket');
    if (basketData) {
      const parsedBasket = JSON.parse(basketData);
      setBasket(parsedBasket);
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const basketSize = Object.values(basket).reduce((acc, curr) => acc + curr, 0);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAccountButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Accueil', onClick: () => { navigate('/'); setDrawerOpen(false) }, icon: <Home /> },
    { text: 'Billeterie', onClick: () => { navigate('/tickets'); setDrawerOpen(false) }, icon: <ConfirmationNumber /> },
    { text: 'À propos', onClick: () => { navigate('/about'); setDrawerOpen(false) }, icon: <Info /> },
  ];

  const accountMenuItems = [
    { text: 'Mon compte', onClick: () => { handleClosePopover(); navigate(user?.role === 'admin' ? '/dashboard' : '/account') } },
    { text: 'Déconnexion', onClick: () => { handleClosePopover(); dispatch(logout()).then(() => { navigate('/login'); }); } },
  ];

  const loginMenuItems = [
    { text: 'Connexion', onClick: () => { handleClosePopover(); navigate('/login') } },
    { text: 'Créer un compte', onClick: () => { handleClosePopover(); navigate('/register') } },
  ];

  const renderMenuItems = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItemButton key={index} onClick={item.onClick}>
          {item?.icon && (
            <Box sx={{ marginRight: '1em' }}>{item?.icon}</Box>
          )}
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <>
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.90),
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        color: 'text.secondary',
        left: 0,
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          height: '50px',
          px: 2
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Menu />}
          onClick={toggleDrawer}
          sx={{ p: 0, border: 'none', '&:hover': { border: 'none' } }}
        >
          Menu
        </Button>
        <div onClick={() => navigate('/')}>
          <img src={logo} alt="logo" style={{ width: '40px', cursor: 'pointer' }} />
        </div>
        <div>
          <IconButton color="inherit" aria-label="basket" onClick={() => navigate('/basket')}>
            {basketSize > 0 ? (
              <Badge badgeContent={basketSize} color="secondary" max={99}>
                <ShoppingBasket color="secondary" />
              </Badge>
            ) : (
              <ShoppingBasket color="secondary" />
            )}
          </IconButton>
          <IconButton color="inherit" aria-label="account" onClick={handleAccountButtonClick}>
            <AccountCircle color="secondary" />
          </IconButton>
        </div>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper>
            {user?.id ? renderMenuItems(accountMenuItems) : renderMenuItems(loginMenuItems)}
          </Paper>
        </Popover>
      </Stack>
    </Box>
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
      PaperProps={{
          sx: {
            '--nav-bg': '#111111',
            '--nav-color': theme.palette.common.white,
            '--nav-border-color': 'transparent',
            '--nav-logo-border': purple.main,
            '--nav-section-title-color': neutral[400],
            '--nav-item-color': neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.common.white,
            '--nav-item-disabled-color': neutral[500],
            '--nav-item-icon-color': neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': neutral[500],
            '--nav-item-chevron-color': neutral[600],
            '--nav-scrollbar-color': neutral[400],
            backgroundColor: 'var(--nav-bg)',
            borderRightColor: 'var(--nav-border-color)',
            borderRightStyle: 'solid',
            borderRightWidth: 1,
            color: 'var(--nav-color)',
            overflowX: 'hidden',
            width: '280px'
          }
        }}
      >
        {renderMenuItems(menuItems)}
      </Drawer>
    </>
  );
};

export default Navigation;
