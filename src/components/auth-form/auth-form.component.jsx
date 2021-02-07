import React from 'react';
import { Form, Button } from 'react-bootstrap';

import FormInput from '../form-input/form-input.component';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.type == 'login') console.log(`Login`, this.state);
    else console.log(`Register`, this.state);
    this.setState({ username: '', password: '' });
  };

  render() {
    return (
      <Form>
        <FormInput
          handleChange={this.handleChange}
          label='Username'
          controlId='formUsername'
          type='text'
          placeholder='Enter username'
          name='username'
          value={this.state.username}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Password'
          controlId='formPassword'
          type='text'
          placeholder='Enter password'
          name='password'
          value={this.state.password}
        />

        <Button variant='primary' type='submit' onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default AuthForm;
