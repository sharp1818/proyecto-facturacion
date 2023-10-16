import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Origin': '*',
  },
});

function App() {
  const baseURL = 'http://127.0.0.1:8000'; 
  const [currentUser, setCurrentUser]: any = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   client.get("/api/user")
  //     .then(function (res) {
  //       setCurrentUser(true);
  //     })
  //     .catch(function (error) {
  //       setCurrentUser(false);
  //     });
  // }, []);

  useEffect(() => {
    axios.get(`${baseURL}/api/user`)
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
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

  // function submitRegistration(e: any) {
  //   e.preventDefault();
  //   client.post(
  //     "/api/register",
  //     {
  //       email: email,
  //       username: username,
  //       password: password
  //     }
  //   ).then(function (res) {
  //     client.post(
  //       "/api/login",
  //       {
  //         email: email,
  //         password: password
  //       }
  //     ).then(function (res) {
  //       setCurrentUser(true);
  //     });
  //   });
  // }

  function submitRegistration(e: any) {
    e.preventDefault();
    axios.post(
      `${baseURL}/api/register`,
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function (res) {
      axios.post(
        `${baseURL}/api/login`,
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e: any) {
    e.preventDefault();
    axios.post(
      `${baseURL}/api/login`,
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e: any) {
    e.preventDefault();
    axios.post(
      `${baseURL}/api/logout`,
      { withCredentials: true }
    ).then(function (res) {
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
