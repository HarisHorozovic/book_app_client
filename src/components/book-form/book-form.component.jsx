import React from 'react';
import { Form, Button } from 'react-bootstrap';

import FormInput from '../form-input/form-input.component';

class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isbn: '',
      title: '',
      pages: 0,
      published: 0,
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
          label='ISBN'
          controlId='formIsbn'
          type='text'
          placeholder='Enter ISBN'
          name='isbn'
          value={this.state.isbn}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Title'
          controlId='formTitle'
          type='text'
          placeholder='Enter book title'
          name='title'
          value={this.state.title}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Pages'
          controlId='formPages'
          type='number'
          placeholder='Enter number of pages'
          name='pages'
          value={this.state.pages}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Published'
          controlId='formPublished'
          type='number'
          placeholder='Enter books year of publishing'
          name='published'
          value={this.state.published}
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

export default BookForm;
