import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Stack, SwipeableDrawer } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styleUser from './User.module.scss'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MenuIcon from '@mui/icons-material/Menu';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const User = () => {
  const navigate = useNavigate()
  const handleProducts = () => {
    navigate('/products');
  }
  const handleFamilyProducts = () => {
    navigate('/family-products');
  }
  const handleInvoices = () => {
    navigate('/invoices');
  }
  const handleInvoicing = () => {
    navigate('/invoicing');
  }
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
      >
        <ListItemButton onClick={handleProducts} >
          <ListItemIcon className={styleUser.icon}>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItemButton>
        <ListItemButton onClick={handleFamilyProducts}>
          <ListItemIcon className={styleUser.icon}>
            <AddToPhotosIcon />
          </ListItemIcon>
          <ListItemText primary="Familia de productos" />
        </ListItemButton>
        <ListItemButton onClick={handleInvoices}>
          <ListItemIcon className={styleUser.icon}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Facturas" />
        </ListItemButton>
        <ListItemButton onClick={handleInvoicing}>
          <ListItemIcon className={styleUser.icon}>
            <LocalPrintshopIcon />
          </ListItemIcon>
          <ListItemText primary="Emitir Factura" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      <div style={{background: '#cfcfcf'}}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          {(['left'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <ListItemIcon className={styleUser.icon}>
                  <MenuIcon color='primary'/>
                </ListItemIcon></Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </Stack>
      </div>

      <Outlet/>
    </div>
  );
};

export default User;