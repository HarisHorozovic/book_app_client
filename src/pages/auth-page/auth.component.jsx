import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AuthForm from '../../components/auth-form/auth-form.component';

import './auth.styles.css';

const AuthPage = () => {
  return (
    <Container className='auth-page'>
      <Row>
        <Col sm='12' md='6'>
          <h1>Login</h1>
          <AuthForm type='login' />
        </Col>
        <Col sm='12' md='6'>
          <h1>Register</h1>
          <AuthForm type='register' />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
