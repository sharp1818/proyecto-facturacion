import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <Container>
        <section
          style={{
            padding: '24px',
            marginBottom: '24px',
            textAlign: 'center',
            backgroundColor: '#f3f8ff',
          }}
        >
          <Typography variant="h4">Bienvenidos a Nuestra Agencia Marítima</Typography>
          <Typography variant="body1">
            Somos expertos en servicios de transporte y logística marítima.
          </Typography>
        </section>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper
              style={{
                padding: '24px',
                marginBottom: '24px',
                textAlign: 'center',
                backgroundColor: '#f3f8ff',
              }}
            >
              <Typography variant="h5">Nuestros Servicios</Typography>
              <Typography variant="body1">
                Ofrecemos una amplia gama de servicios de transporte marítimo.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              style={{
                padding: '24px',
                marginBottom: '24px',
                textAlign: 'center',
                backgroundColor: '#f3f8ff',
              }}
            >
              <Typography variant="h5">Envíos Internacionales</Typography>
              <Typography variant="body1">
                Facilitamos envíos internacionales eficientes y seguros.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <section
          style={{
            padding: '24px',
            marginBottom: '24px',
            textAlign: 'center',
            backgroundColor: '#f3f8ff',
          }}
        >
          <Typography variant="h4">Nuestra Flota</Typography>
          <Typography variant="body1">
            Contamos con una flota moderna y confiable para satisfacer tus necesidades de transporte.
          </Typography>
        </section>

        <section
          style={{
            padding: '24px',
            textAlign: 'center',
            backgroundColor: '#f3f8ff',
          }}
        >
          <Typography variant="h4">Contáctanos</Typography>
          <Typography variant="body1">
            ¡Estamos aquí para ayudarte! Contáctanos para obtener más información.
          </Typography>
        </section>
      </Container>
    </div>
  );
};

export default Home;