import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

const MainNav = () => {
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
          <Nav.Link href='/auth'>Login</Nav.Link>
          <Nav.Link href='/manage'>Add New</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
