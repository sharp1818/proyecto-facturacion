import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


function App() {

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <AppRoutes />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
