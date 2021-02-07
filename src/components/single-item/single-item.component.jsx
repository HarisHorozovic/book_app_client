// in a single item pass through image and other props
// deal with image if there is one
// log other props to see if it is possible to loop through them
// if it is, for every prop pass create item to hold the data

import React from 'react';
import { withRouter } from 'react-router-dom';

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const SingleItem = ({
  item: {
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
  },
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <Card.Link href='#'>
            {title ? title : firstName + ' ' + lastName}
          </Card.Link>
        </Card.Title>
      </Card.Header>
      <Card.Body>
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

export default SingleItem;
