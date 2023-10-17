import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import styleUser from './User.module.scss'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';

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
  return (
    <div className={styleUser.userContainer}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper'}}
        component="nav"
      >
        <ListItemButton >
          <ListItemIcon className={styleUser.icon}>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" onClick={handleProducts} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className={styleUser.icon}>
            <AddToPhotosIcon />
          </ListItemIcon>
          <ListItemText primary="Familia de productos" onClick={handleFamilyProducts} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon className={styleUser.icon}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Facturas" onClick={handleInvoices} />
        </ListItemButton>
      </List>
      <Outlet/>
    </div>
  );
};

export default User;