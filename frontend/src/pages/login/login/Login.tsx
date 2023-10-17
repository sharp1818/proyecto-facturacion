import { Alert, Button, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styleLogin from './Login.module.scss'
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../../services/auth_services/auth.services';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/authSlice';

interface User {
  email: string | undefined | any;
}

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const cleanForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //-------LOGIN-------
      const res : any = await userLogin(email, password);
      const userData: User = { email: res.data.email };
      dispatch(login(userData));
      navigate("/home");
    } catch (error: any) {
      setOpen(true);
      setMessage('Error, vuelve a ingresar credenciales');
      cleanForm();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        className={styleLogin.formContainer}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          AREA DE CLIENTES
        </Typography>
        <Stack
          direction="column"
          alignItems="end"
          spacing={2}
          width="100%"
          maxWidth="500px"
        >
          <TextField
            placeholder='Correo'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              sx: { borderRadius: 8, height: 44, alignItems: "center", cursor: "pointer" },
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            type={"email"}
            fullWidth
          />
          <TextField
            placeholder='Contraseña'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              sx: { borderRadius: 8, height: 44, alignItems: "center", cursor: "pointer" },
              endAdornment: (
                <InputAdornment position="end">
                  <HttpsIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            type={"password"}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Stack>
        <Stack className={styleLogin.directionRow}>
          <Link
            to="/new-user"
            color='primary'
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="text"
              style={{ textTransform: 'none' }}
            >
              Crear un nuevo usuario
            </Button>
          </Link>
        </Stack>
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

export default Login;