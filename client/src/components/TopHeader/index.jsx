import React, { useState } from 'react';
import { AppBar, Button, IconButton, Typography, Drawer, List, ListItem, ListItemText, Hidden, Box, Popover, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' },
  ];

  const accountMenuItems = [
    { text: 'Profile', link: '/profile' },
    { text: 'Settings', link: '/settings' },
    { text: 'Logout', link: '/logout' },
  ];

  const renderMenuItems = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItem button key={index}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <React.Fragment>
      <AppBar position="static">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Hidden mdUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" component="div">
            Paris 2024
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Hidden smDown>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {}}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {item.text}
                </Button>
              ))}
          </Hidden>
          <Hidden smDown>
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
                {renderMenuItems(accountMenuItems)}
              </Paper>
            </Popover>
          </Hidden>
        </Box>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {renderMenuItems(menuItems)}
        <List>
          <ListItem button>
            <ListItemText primary="Account" />
          </ListItem>
          {renderMenuItems(accountMenuItems)}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default TopHeader;
