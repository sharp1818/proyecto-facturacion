import React, { MouseEventHandler, useEffect } from 'react';

import styleHeader from './Header.module.scss';
import { Button, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { login, logout } from '../../features/authSlice';
import UserMenuComponent from '../UserMenu/UserMenu';
import Logo from '../Logo/Logo';

import { checkUserAuthentication } from '../../services/auth_services/auth.services';

interface User {
  email: string | undefined | any;
}

const Header = () => {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const email = useSelector((state: RootState) => state.auth.email);

  const dispatch = useDispatch();

  useEffect(() => {
    //-------USUARIO CONECTADO----------
    const fetchAuth = async () => {
      try {
        const response = await checkUserAuthentication();
        if (response.status === 200) {
          const userData: User = { email: email };
          dispatch(login(userData));
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    fetchAuth();
  }, [dispatch]);


  return (
    <div className={styleHeader.bgHeader}>
      <header className={styleHeader.header}>
        <Logo className={'black'} />
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
        </Stack>
      </header>
    </div>
  );
};

export default Header;