import React from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav, Button } from 'react-bootstrap';

import { logout } from '../../redux/user/user.actions';

const MainNav = ({ currentUser, logout }) => {
  return (
    <Navbar
      className='main-nav'
      bg='dark'
      expand='lg'
      variant='dark'
      fixed='top'
    >
      <Navbar.Brand href='/'>BookApp</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          {currentUser ? (
            <Nav>
              <Nav.Link href='/create'>Add New</Nav.Link>
              <Button onClick={() => logout()}>Logout</Button>
            </Nav>
          ) : (
            <Nav.Link href='/auth'>Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
