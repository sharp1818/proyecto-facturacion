import React from 'react';
import styleMenu from './UserMenu.module.scss'
import { Button, Divider } from '@mui/material';
import "@szhsin/react-menu/dist/index.css";
import { Menu, MenuItem } from "@szhsin/react-menu";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { logoutUser } from '../../services/auth_services/auth.services';

interface Props {
  name: string | undefined | any
}

const UserMenuComponent: React.FC<Props> = ({ name }) => {

  const dispatch = useDispatch();
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

  const handleLogout = async () => {
    //------- LOGOUT -------
    try {
      await logoutUser();
      dispatch(logout());
      navigate('/login');
    } catch (error) {

    }
  };
  return (
    <div>
      <Menu menuButton={<Button><span className={styleMenu.buttonUserText}><CoPresentIcon />{name}</span></Button>}
        direction={'bottom'}
      >
        <MenuItem onClick={handleProducts}>Productos</MenuItem>
        <MenuItem onClick={handleFamilyProducts}>Familia de productos</MenuItem>
        <MenuItem onClick={handleInvoices}>Facturas</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}><span className={styleMenu.logout}><LogoutIcon />Cerrar sesión</span></MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenuComponent;
