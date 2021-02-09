import React from 'react';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import {
  createBook,
  editBook,
  addAuthorToBook,
  removeAuthorFromBook,
} from '../../redux/book/book.actions';

class BookForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isbn: '',
      title: '',
      pages: 0,
      published: 0,
      newImage: '',
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

    data.append('isbn', this.state.isbn);
    data.append('title', this.state.title);
    data.append('pages', this.state.pages);
    data.append('published', this.state.published);

    if (this.state.image || this.state.image != '') {
      data.append('image', this.state.image);
    }

    if (this.props.singleBook) {
      this.props.editBook(this.state.isbn, data);
    } else {
      this.props.createBook(data);
    }
  };

  addBook = (bookId, authorId) => {
    this.props.addAuthorToBook(bookId, { idAuthor: authorId });
  };

  removeBook = (bookId, authorId) => {
    this.props.removeAuthorFromBook(bookId, authorId);
  };

  componentDidMount = () => {
    this.setState(this.props.singleBook);
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

        {this.props.type && this.props.type == 'edit' ? (
          this.props.authors && this.props.authors.length > 0 ? (
            <Container>
              <h3>Add authors to book</h3>
              <Form.Group controlId='authorSearch'>
                <Form.Control
                  onChange={this.handleChange}
                  name='search'
                  placeholder='Search authors'
                />
              </Form.Group>
              <Row>
                {this.props.authors.map((author) => {
                  return `${author.firstName} ${author.lastName}`
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ? (
                    <Col xs={12} md={4} lg={3} key={author.id}>
                      <Card>
                        <Card.Header>
                          <Card.Title>
                            {author.firstName + ' ' + author.lastName}
                          </Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Button
                            variant='primary'
                            onClick={() =>
                              this.addBook(this.state.isbn, author.id)
                            }
                          >
                            Add
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() =>
                              this.removeBook(this.state.isbn, author.id)
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
            <h2>There are no authors</h2>
          )
        ) : null}

        <Button variant='primary' type='submit' onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = ({ book, author }) => ({
  singleBook: book.singleBook,
  authors: author.authors,
  bookMessage: book.bookMessage,
  bookError: book.bookError,
});

const mapDispatchToProps = (dispatch) => ({
  createBook: (data) => dispatch(createBook(data)),
  editBook: (bookId, data) => dispatch(editBook(bookId, data)),
  addAuthorToBook: (bookId, authorId) =>
    dispatch(addAuthorToBook(bookId, authorId)),
  removeAuthorFromBook: (bookId, authorId) =>
    dispatch(removeAuthorFromBook(bookId, authorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
