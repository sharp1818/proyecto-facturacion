import React, { useState } from 'react';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import styleNewUser from './NewUser.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { userLogin, register } from '../../../services/auth_services/auth.services';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/authSlice';

interface User {
  email: string | undefined | any;
}

const NewUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const rePassword = useInput("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      //------------ CREAR USUARIO ------------
      const registrationResponse = await register(email.value, name.value, password.value);
      if (registrationResponse.status >= 200 && registrationResponse.status <= 299) {
        const loginResponse : any = await userLogin(email.value, password.value);
        const userData: User = { email: loginResponse.data.email };
        dispatch(login(userData));
        navigate("/home");
      }

    } catch (error: any) {
      setOpen(true);
      setMessage('Algo ocurrió, por favor vuelve a intentarlo');
    }
  }

  return (
    <form onSubmit={onSubmit} className={styleNewUser.formContainer}>
      <Typography variant="h6" gutterBottom>
        Registrar Usuario
      </Typography>
      <div className={styleNewUser.newUserForm}>
        <TextField
          label="Nombre *"
          variant="outlined"
          value={name.value}
          onChange={name.onChange}
          size="small"
          fullWidth
        />
        <TextField
          label="Email *"
          variant="outlined"
          type={"email"}
          value={email.value}
          onChange={email.onChange}
          size="small"
          fullWidth
        />
        <TextField
          label="Contraseña *"
          variant="outlined"
          type={"password"}
          value={password.value}
          onChange={password.onChange}
          size="small"
          fullWidth
        />
        <TextField
          error={!(password.value === rePassword.value)}
          label="Confirmar contraseña *"
          variant="outlined"
          type={"password"}
          value={rePassword.value}
          onChange={rePassword.onChange}
          size="small"
          fullWidth
        />
      </div>
      <div className={styleNewUser.buttonContainer}>
        <Typography
          variant="subtitle2"
          gutterBottom
        >
          (*) Datos obligatorios
        </Typography>
        <Button
          disabled={
            !(name.value &&
              email.value &&
              password.value === rePassword.value &&
              password.value !== "" &&
              rePassword.value !== "")
          }
          type="submit"
          variant="contained"
        >
          Crear perfil
        </Button>
      </div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Link
          color='primary'
          to="/login"
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant="text"
            style={{ textTransform: 'none' }}
          >
            Dirigirme a login
          </Button>
        </Link>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={'error'}
        >
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default NewUser;