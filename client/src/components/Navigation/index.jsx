import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, IconButton, Drawer, List, ListItemButton, ListItemText, Box, Popover, Paper, useMediaQuery, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { neutral, purple } from '../../theme/colors'; 
import { logout } from '../../axios/logout';

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
    { text: 'Accueil', onClick: () => { navigate('/'); setDrawerOpen(false) } },
    { text: 'À propos', link: '/about' },
    { text: 'Contact', link: '/contact' },
  ];

  const accountMenuItems = [
    { text: 'Profil', link: '/profile' },
    { text: 'Paramètres', link: '/settings' },
    { text: 'Déconnexion', onClick: () => { dispatch(logout()); navigate('/login'); setDrawerOpen(false) } },
  ];

  const loginMenuItems = [
    { text: 'Connexion', onClick: () => { navigate('/login'); setDrawerOpen(false) } },
    { text: 'Créer un compte', link: '/register' },
  ];

  const renderMenuItems = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItemButton key={index} onClick={item.onClick}>
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
        spacing={2}
        sx={{
          minHeight: '50px',
          px: 2
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
        >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            {!isMobile && (
              <Typography variant="h6">
                Menu
              </Typography>
            )}
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Stack
            alignItems="center"
            direction="row"
            display="inline-flex"
            spacing={1}
            sx={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                color: 'text.primary',
                fontFamily: '\'Plus Jakarta Sans\', sans-serif',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.3px',
                lineHeight: 2.5,
                '& span': {
                  color: 'primary.main'
                }
              }}
            >
              Paris <span>2024</span>
            </Box>
          </Stack>
        </Stack>
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
