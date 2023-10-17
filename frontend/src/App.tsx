import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login, register, logoutUser, checkUserAuthentication } from './services/auth_services/auth.services';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const ga = () => {
  console.log('gaaXd')
}

function App() {
  const [currentUser, setCurrentUser]: any = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await checkUserAuthentication();
        if (response.status === 200) {
          setCurrentUser(true);
        } else {
          setCurrentUser(false);
        }
      } catch (error) {
      }
    };
    fetchAuth();
  }, []);


  function update_form_btn() {
    const formBtn = document.getElementById("form_btn");
    if (formBtn) {
      if (registrationToggle) {
        formBtn.innerHTML = "Register";
        setRegistrationToggle(false);
      } else {
        formBtn.innerHTML = "Log in";
        setRegistrationToggle(true);
      }
    }
  }

  const submitRegistration = (e: any) => {
    e.preventDefault();
    register(email, username, password)
      .then((res: any) => {
        if (res.status === 200) {
          login(email, password)
            .then((res) => {
              setCurrentUser(true);
            });
        }
      })
      .catch(error => {

      });
  }

  const submitLogin = (e: any) => {
    e.preventDefault();
    login(email, password)
      .then(function (res) {
        console.log(res)
        setCurrentUser(true);
      });
  }

  const submitLogout = (e: any) => {
    e.preventDefault();
    logoutUser()
      .then(function (res) {
        setCurrentUser(false);
      });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BrowserRouter>
        <Header
          onClick={ga}
        />
        <Nav
          onClick={ga}
        />
        <AppRoutes />
        <Footer
          onClick={ga}
        />
      </BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Authentication App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        registrationToggle ? (
          <div className="center">
            <Form onSubmit={e => submitRegistration(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <div className="center">
            <Form onSubmit={e => submitLogin(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
      }
    </div>
  );
}

export default App;
