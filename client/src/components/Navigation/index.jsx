import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Popover, Paper, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Email, Info, Home, Menu, ConfirmationNumber } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { neutral, purple } from '../../theme/colors'; 
import { logout } from '../../axios/logout';
import logo from './logo.svg';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

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
    { text: 'Billeterie', link: '/tickets', icon: <ConfirmationNumber /> },
    { text: 'À propos', link: '/about', icon: <Info /> },
    { text: 'Contact', link: '/contact', icon: <Email /> },
  ];

  const accountMenuItems = [
    { text: 'Mon compte', onClick: () => { handleClosePopover(); navigate('/account') } },
    { text: 'Paramètres', link: '/settings' },
    { text: 'Déconnexion', onClick: () => { handleClosePopover(); dispatch(logout()).then(() => { navigate('/login'); }); } },
  ];

  const loginMenuItems = [
    { text: 'Connexion', onClick: () => { handleClosePopover(); navigate('/login') } },
    { text: 'Créer un compte', link: '/register' },
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
          startIcon={<Menu />}
          onClick={toggleDrawer}
          sx={{ p: 0, border: 'none', '&:hover': { border: 'none' } }}
        >
          Menu
        </Button>
        <img src={logo} alt="logo" style={{ width: '40px' }} />
        <IconButton color="inherit" aria-label="account" onClick={handleAccountButtonClick}>
          <AccountCircleIcon />
        </IconButton>
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
            '--nav-bg': neutral[800],
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
