import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import { login, register } from '../../redux/user/user.actions';

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
    if (this.props.type == 'login')
      this.props.login({
        username: this.state.username,
        password: this.state.password,
      });
    else
      this.props.register({
        username: this.state.username,
        password: this.state.password,
      });
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

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  register: (user) => dispatch(register(user)),
});

export default connect(null, mapDispatchToProps)(AuthForm);
