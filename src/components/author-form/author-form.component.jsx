import React from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import {
  createAuthor,
  editAuthor,
  addBookToAuthor,
  removeBookFromAuthor,
} from '../../redux/author/author.actions';

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      dob: '',
      image: '',
      search: '',
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

  addBook = (authorId, bookId) => {
    this.props.addBookToAuthor(authorId, { idBook: bookId });
  };

  removeBook = (authorId, bookId) => {
    this.props.removeBookFromAuthor(authorId, bookId);
  };

  componentDidMount = () => {
    if (this.props.singleAuthor) {
      const { id, firstName, lastName, dob, image } = this.props.singleAuthor;
      let date = new Date(Date.parse(dob)).toISOString().substr(0, 10);
      this.setState({ id, firstName, lastName, dob: date, image });
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

        {this.props.type && this.props.type == 'edit' ? (
          this.props.books && this.props.books.length > 0 ? (
            <Container>
              <h3>Add books to author</h3>
              <Form.Group controlId='bookSearch'>
                <Form.Control
                  onChange={this.handleChange}
                  name='search'
                  placeholder='Search books'
                />
              </Form.Group>
              <Row>
                {this.props.books.map((book) => {
                  return book.title
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ? (
                    <Col xs={12} md={4} lg={3} key={book.isbn}>
                      <Card>
                        <Card.Header>
                          <Card.Title>{book.title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Button
                            variant='primary'
                            onClick={() =>
                              this.addBook(this.state.id, book.isbn)
                            }
                          >
                            Add
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() =>
                              this.removeBook(this.state.id, book.isbn)
                            }
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ) : null;
                })}
              </Row>
            </Container>
          ) : (
            <h2>There are no books</h2>
          )
        ) : null}

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
  books: book.books,
});

const mapDispatchToProps = (dispatch) => ({
  createAuthor: (data) => dispatch(createAuthor(data)),
  editAuthor: (authorId, data) => dispatch(editAuthor(authorId, data)),
  addBookToAuthor: (authorId, bookId) =>
    dispatch(addBookToAuthor(authorId, bookId)),
  removeBookFromAuthor: (authorId, bookId) =>
    dispatch(removeBookFromAuthor(authorId, bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorForm);
