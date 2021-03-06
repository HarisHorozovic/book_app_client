import React from 'react';

import { Form } from 'react-bootstrap';

const FormInput = ({ handleChange, label, controlId, ...otherProps }) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control onChange={handleChange} {...otherProps} />
    </Form.Group>
  );
};

export default FormInput;
