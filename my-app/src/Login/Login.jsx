import { useState } from "react";
import AxiosClient from "../Axios/AxiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "../Login/Login.css";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [account, setAccount] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account.username || !account.password) {
      setErrors({
        general: 'Please enter username and password.',
      });
      return;
    }

    try {
      const response = await AxiosClient.post('/Users/login', account);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('jwt', token);
        navigate('/user');
      } else {
        setErrors({
          general: 'Invalid username or password.',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.status === 401) {
        setErrors({
          general: 'Incorrect username or password. Please try again.',
        });
      } else {
        setErrors({
          general: 'An error occurred during login.',
        });
      }
    }
  };

  return (
    <Container fluid>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col col='12'>
          <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <Card.Body className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <Form.Group className='mb-4 w-100'>
                <Form.Control
                  placeholder='User name'
                  type='username'
                  size="lg"
                  onChange={handleChange}
                  name="username"
                />
              </Form.Group>

              <Form.Group className='mb-4 w-100'>
                <InputGroup>
                  <Form.Control
                    placeholder='Password'
                    type='password'
                    size="lg"
                    onChange={handleChange}
                    name="password"
                  />
                </InputGroup>
              </Form.Group>

              {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

              <Form.Check
                type='checkbox'
                id='flexCheckDefault'
                className='mb-4'
                label='Remember password'
              />

              <Button size='lg' onClick={handleSubmit}>
                Login
              </Button>

              <hr className="my-4" />

              <Button className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                Sign in with Google
              </Button>

              <Button className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                <FontAwesomeIcon icon={faFacebookF} className="mx-2" />
                Sign in with Facebook
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login