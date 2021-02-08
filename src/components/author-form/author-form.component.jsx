import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import { createAuthor, editAuthor } from '../../redux/author/author.actions';

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

    data.append('firstName', this.state.firstName);
    data.append('lastName', this.state.lastName);
    data.append('dob', this.state.dob);
    data.append('published', this.state.published);

    if (this.state.image || this.state.image != '') {
      data.append('image', this.state.image);
    }

    if (this.props.singleAuthor) {
      this.props.editAuthor(this.state.id, data);
    } else {
      this.props.createAuthor(data);
    }
  };

  componentDidMount = () => {
    this.setState(this.props.singleAuthor);
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

const mapStateToProps = ({ author, book }) => ({
  singleAuthor: author.singleAuthor,
  singleBook: book.singleBook,
});

const mapDispatchToProps = (dispatch) => ({
  createAuthor: (data) => dispatch(createAuthor(data)),
  editAuthor: (authorId, data) => dispatch(editAuthor(authorId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorForm);
