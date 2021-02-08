import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import './single-item.styles.css';

import {
  deleteAuthor,
  getSingleAuthor,
} from '../../redux/author/author.actions';
import { deleteBook, getSingleBook } from '../../redux/book/book.actions';

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
    await props.getSingleBook(isbn);
    props.history.push(`/edit-book/${isbn}`);
  } else {
    await props.getSingleAuthor(id);
    props.history.push(`/edit-author/${id}`);
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
    authors,
    books,
    image,
  } = props.item;

  const { currentUser } = props;
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <Card.Link href={isbn ? `/edit-book/${isbn}` : `/edit-author/${id}`}>
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
          <Card.Text>DOB: {dob}</Card.Text>
        ) : (
          <Card.Text>
            Pages: {pages}| Published: {published}
          </Card.Text>
        )}
        {authors && authors.length > 0 ? (
          <ListGroup>
            {authors.map((author) => (
              <ListGroupItem key={author.id}>
                <Card.Link href='#'>
                  {author.firstName + ' ' + author.lastName}
                </Card.Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : books && books.length > 0 ? (
          <ListGroup>
            {books.map((book) => (
              <ListGroupItem key={book.isbn}>
                <Card.Link href='#'>{book.title}</Card.Link>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleItem));
