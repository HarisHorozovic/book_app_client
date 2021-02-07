import React from 'react';
import { Form, Button } from 'react-bootstrap';

import FormInput from '../form-input/form-input.component';

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      dob: '',
      image: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();

    // data.append('isbn', this.state.isbn);
    // data.append('title', this.state.title);
    // data.append('pages', this.state.pages);
    // data.append('published', this.state.published);

    if (this.state.image || this.state.image != '') {
      data.append('image', this.state.image);
    }

    console.log(data);
  };

  componentDidMount = () => {
    if (this.props && Object.keys(this.props).length > 0) {
      this.setState(this.props);
    }
  };

  render() {
    return (
      <Form>
        <FormInput
          handleChange={this.handleChange}
          label='First Name'
          controlId='formFirstName'
          type='text'
          placeholder='Enter author first name'
          name='firstName'
          value={this.state.firstName}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Last Name'
          controlId='formLastName'
          type='text'
          placeholder='Enter author last name'
          name='lastName'
          value={this.state.lastName}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Date of birth'
          controlId='formDob'
          type='date'
          placeholder='Authors date of birth'
          name='dob'
          value={this.state.dob}
        />

        <Form.Group controlId='formFile'>
          <Form.Label>Upload Image</Form.Label>
          <Form.File
            onChange={this.handleFileChange}
            id='image'
            name='image'
            placeholder='Upload image'
          />
          <Form.Text>Error handle here</Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit' onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default AuthorForm;
