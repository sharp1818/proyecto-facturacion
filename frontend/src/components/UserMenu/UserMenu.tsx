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


interface Props {
  name: string | undefined | any
}

const UserMenuComponent: React.FC<Props> = ({ name }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const handleProfile = () => {
    navigate('/profile');
  }
  const handleAddress = () => {
    navigate('/address');
  }
  const handleOrders= () => {
    navigate('/orders');
  }
  const handlePreSales= () => {
    navigate('/pre-sales');
  }
  const handleLogout = async () => {
    //------- LOGOUT -------
    // try {
    //   await signOut(auth);
    //   dispatch(logout());
    //   navigate('/login');
    // } catch (error) {

    // }
  };
  return (
    <div>
      <Menu menuButton={<Button><span className={styleMenu.buttonUserText}><CoPresentIcon />{name}</span></Button>}
        direction={'bottom'}
      >
        <MenuItem onClick={handleProfile}>Mis datos</MenuItem>
        <MenuItem onClick={handleAddress}>Mis direcciones</MenuItem>
        <MenuItem onClick={handleOrders}>Mis pedidos</MenuItem>
        <MenuItem onClick={handlePreSales}>Mis preventas</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}><span className={styleMenu.logout}><LogoutIcon />Cerrar sesión</span></MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenuComponent;
