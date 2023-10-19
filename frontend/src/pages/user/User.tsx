import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styleUser from './User.module.scss'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const User = () => {
  const navigate = useNavigate()
  const handleProducts = () => {
    navigate('/products');
  }
  const handleFamilyProducts = () => {
    navigate('/family-products');
  }
  const handleInvoices= () => {
    navigate('/invoices');
  }
  const handleInvoicing= () => {
    navigate('/invoicing');
  }
  return (
    <div className={styleUser.userContainer}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper'}}
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
      <Outlet/>
    </div>
  );
};

export default User;