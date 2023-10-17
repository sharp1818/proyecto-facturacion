import React, { useState } from 'react';
import { Alert, Autocomplete, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import styleNewUser from './NewUser.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/useInput';

const NewUser = () => {

  const navigate = useNavigate()

  const name = useInput("");
  const lastName = useInput("");
  const docType = useInput("DNI");
  const docNumber = useInput("");
  const phone = useInput("");
  const email = useInput("");
  const password = useInput("");
  const rePassword = useInput("");
  const countryName = useInput("PERÚ");
  const cityName = useInput("Lima");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      //------------ CREAR USUARIO ------------
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email.value,
      //   password.value
      // );
      // const user = userCredential.user;

      // const additionalUserInfo = {
      //   name: name.value,
      //   lastName: lastName.value,
      //   docType: docType.value,
      //   docNumber: docNumber.value,
      //   phone: phone.value,
      //   email: email.value,
      //   country: countryName.value,
      //   city: cityName.value,
      // };
      // const userDocRef = doc(db, 'users', user.uid);
      // await setDoc(userDocRef, additionalUserInfo, { merge: true });
      navigate("/home");

    } catch (error: any) {
      setOpen(true);
      setMessage(error.code);
    }
  }

  const docTypes = [
    'DNI',
    'CARNET DE EXTR.',
    'PASAPORTE'
  ];

  const countries = [
    'PERÚ',
  ];

  const cities = [
    'Amazonas',
    'Áncash',
    'Apurímac',
    'Arequipa',
    'Ayacucho',
    'Cajamarca',
    'Callao',
    'Cusco',
    'Huancavelica',
    'Huánuco',
    'Ica',
    'Junín',
    'La Libertad',
    'Lambayeque',
    'Lima',
    'Loreto',
    'Madre de Dios',
    'Moquegua',
    'Pasco',
    'Piura',
    'Puno',
    'San Martín',
    'Tacna',
    'Tumbes',
    'Ucayali',
  ];

  return (
    <form onSubmit={onSubmit} className={styleNewUser.formContainer}>
      <Typography variant="h6" gutterBottom>
        Registrar Usuario
      </Typography>
      <div className={styleNewUser.newUserForm}>
        <TextField
          label="Nombres *"
          variant="outlined"
          value={name.value}
          onChange={name.onChange}
          size="small"
          fullWidth
        />
        <TextField
          label="Apellidos *"
          variant="outlined"
          value={lastName.value}
          onChange={lastName.onChange}
          size="small"
          fullWidth
        />
        <Autocomplete
          disablePortal
          options={docTypes}
          value={docType.value}
          onChange={(event, newInputValue) => {
            docType.setNewValue(newInputValue);
          }}
          defaultValue={docType.value}
          size="small"
          renderInput={(params) => <TextField {...params} label="Documento *" fullWidth onChange={docType.onChange} />}
        />
        <TextField
          label="Número de Doc. *"
          variant="outlined"
          value={docNumber.value}
          onChange={docNumber.onChange}
          size="small"
          fullWidth
        />
        <TextField
          label="Celular o Teléfono *"
          variant="outlined"
          value={phone.value}
          onChange={phone.onChange}
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
        <Autocomplete
          disablePortal
          options={countries}
          value={countryName.value}
          onChange={(event, newInputValue) => {
            countryName.setNewValue(newInputValue);
          }}
          defaultValue={'PERÚ'}
          size="small"
          renderInput={(params) => <TextField {...params} label="País *" fullWidth onChange={countryName.onChange} />}
        />
        <Autocomplete
          disablePortal
          options={cities}
          value={cityName.value}
          onChange={(event, newInputValue) => {
            cityName.setNewValue(newInputValue);
          }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Departamento *" fullWidth onChange={cityName.onChange} />}
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
              lastName.value &&
              docType.value &&
              docNumber.value &&
              phone.value &&
              email.value &&
              password.value === rePassword.value &&
              password.value !== "" &&
              rePassword.value !== "" &&
              countryName.value &&
              cityName.value)
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