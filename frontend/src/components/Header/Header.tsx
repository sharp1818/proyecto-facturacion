import React, { MouseEventHandler, useEffect } from 'react';

import styleHeader from './Header.module.scss';
import { Badge, Button, InputAdornment, Stack, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { login } from '../../features/authSlice';
import UserMenuComponent from '../UserMenu/UserMenu';
import Logo from '../Logo/Logo';

interface Props {
  onClick: MouseEventHandler;
}
interface User {
  uid: string | undefined | any;
  email: string | undefined | any;
  verifyEmail: boolean | undefined | any;
}

const Header: React.FC<Props> = ({ onClick }) => {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const email = useSelector((state: RootState) => state.auth.email);

  const dispatch = useDispatch();

  useEffect(() => {
    //-------USUARIO CONECTADO----------
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const userData: User = { uid: user.uid, email: user.email, verifyEmail: auth.currentUser?.emailVerified };
    //     dispatch(login(userData));
    //   } else {

    //   }
    // });
  }, [dispatch]);


  return (
    <header className={styleHeader.header}>
      <Logo onClick={onClick} className={'black'} />
      <TextField
        placeholder='Buscar producto por nombre'
        InputLabelProps={{ shrink: true }}
        InputProps={{
          sx: { borderRadius: 8, height: 44, alignItems: "center", cursor: "pointer" },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
        className={styleHeader.filterInput}
      />
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        {isAuthenticated
          ?
          <UserMenuComponent name={email} />
          :
          <Link color='primary' to="login">
            <Button variant="text" startIcon={<PersonIcon />}>
              Ingresar
            </Button>
          </Link>
        }
        <Badge badgeContent={1} color="primary">
          <ShoppingCartIcon />
        </Badge>
        <Badge badgeContent={1} color="primary">
          <FavoriteIcon />
        </Badge>
      </Stack>
    </header>
  );
};

export default Header;