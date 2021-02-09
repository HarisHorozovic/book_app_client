import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import './single-item.styles.css';

import {
  deleteAuthor,
  getSingleAuthor,
  getBooksFromAuthor,
} from '../../redux/author/author.actions';
import {
  deleteBook,
  getSingleBook,
  getAuthorsFromBook,
} from '../../redux/book/book.actions';

import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

const deleteItem = (id, isbn, props) => {
  if (isbn) {
    props.deleteBook(isbn);
  } else {
    props.deleteAuthor(id);
  }
};

const editItem = async (id, isbn, props) => {
  if (isbn) {
    await props.getAuthorsFromBook(isbn);
    await props.getSingleBook(isbn);
    props.history.push(`/edit-book/${isbn}`);
  } else {
    await props.getBooksFromAuthor(id);
    await props.getSingleAuthor(id);
    props.history.push(`/edit-author/${id}`);
  }
};

const displaySingleItem = async (id, isbn, props) => {
  console.log(id, isbn);
  if (id) {
    await props.getBooksFromAuthor(id);
    await props.getSingleAuthor(id);
    props.history.push(`/author/${id}`);
  } else {
    await props.getAuthorsFromBook(isbn);
    await props.getSingleBook(isbn);
    props.history.push(`/book/${isbn}`);
  }
};

const SingleItem = (props) => {
  const {
    id,
    firstName,
    lastName,
    dob,
    isbn,
    title,
    pages,
    published,
    image,
  } = props.item;

  const { currentUser, authors, books } = props;
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <Card.Link onClick={() => displaySingleItem(id, isbn, props)}>
            {title ? title : firstName + ' ' + lastName}
          </Card.Link>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {currentUser ? (
          <Container className='manage-container'>
            <Row>
              <Col xs={12} md={6}>
                <Button
                  variant='primary'
                  className='btn btn-primary'
                  onClick={() => editItem(id, isbn, props)}
                >
                  Edit
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Button
                  variant='danger'
                  onClick={() => deleteItem(id, isbn, props)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        ) : null}
        {image && image != '' ? <Card.Img variant='top' src={image} /> : null}
        {dob ? (
          <Card.Text>
            DOB: {new Date(Date.parse(dob)).toISOString().substr(0, 10)}
          </Card.Text>
        ) : (
          <Card.Text>
            Pages: {pages}| Published: {published}
          </Card.Text>
        )}
        {authors && authors.length > 0 ? (
          <ListGroup>
            <h2>Authors</h2>
            {authors.map((author) => (
              <ListGroupItem key={author.id}>
                <Card.Link
                  onClick={() => displaySingleItem(author.id, isbn, props)}
                >
                  {author.firstName + ' ' + author.lastName}
                </Card.Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : books && books.length > 0 ? (
          <ListGroup>
            <h2>Books</h2>
            {books.map((book) => (
              <ListGroupItem key={book.isbn}>
                <Card.Link
                  onClick={() => displaySingleItem(null, book.isbn, props)}
                >
                  {book.title}
                </Card.Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : null}
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAuthor: (authorId) => dispatch(deleteAuthor(authorId)),
  deleteBook: (bookId) => dispatch(deleteBook(bookId)),
  getSingleAuthor: (authorId) => dispatch(getSingleAuthor(authorId)),
  getSingleBook: (bookId) => dispatch(getSingleBook(bookId)),
  getBooksFromAuthor: (authorId) => dispatch(getBooksFromAuthor(authorId)),
  getAuthorsFromBook: (bookId) => dispatch(getAuthorsFromBook(bookId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleItem));
