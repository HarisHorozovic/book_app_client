import React from 'react';
import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import './home.styles.css';

import {
  getAllAuthors,
  getBooksFromAuthor,
  getSingleAuthor,
  deleteAuthor,
} from '../../redux/author/author.actions';
import {
  getAllBooks,
  getAuthorsFromBook,
  getSingleBook,
  deleteBook,
} from '../../redux/book/book.actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'books',
    };
  }

  componentDidMount() {
    if (!this.props.books) {
      this.props.getAllBooks();
    }

    if (!this.props.authors) {
      this.props.getAllAuthors();
    }
  }

  editItem = async (id, isbn, props) => {
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

  displaySingleItem = async (id, isbn, props) => {
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

  deleteItem = (id, isbn, props) => {
    if (isbn) {
      props.deleteBook(isbn);
    } else {
      props.deleteAuthor(id);
    }
  };

  changeKey = (key) => {
    this.setState({ key });
  };
  render() {
    const { key } = this.state;
    const { books, authors } = this.props;

    return (
      <Tabs
        className='home-page'
        id='homepageTab'
        defaultActiveKey='books'
        transition={false}
        activeKey={key}
        onSelect={(key) => this.changeKey(key)}
      >
        <Tab eventKey='books' title='Books'>
          {books && books.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ISBN (Click to view)</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Pages</th>
                  <th>Published</th>
                  {this.props.currentUser ? (
                    <React.Fragment>
                      <th>Edit</th>
                      <th>Delete</th>
                    </React.Fragment>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  return (
                    <tr key={book.isbn}>
                      <td
                        className='display-item'
                        onClick={() =>
                          this.displaySingleItem(null, book.isbn, this.props)
                        }
                      >
                        {book.isbn}
                      </td>
                      <td>
                        <img
                          src={
                            book.image && book.image != '' ? book.image : '#'
                          }
                        />
                      </td>
                      <td>{book.title}</td>
                      <td>{book.pages}</td>
                      <td>{book.published}</td>
                      {this.props.currentUser ? (
                        <React.Fragment>
                          <td>
                            <Button
                              variant='primary'
                              onClick={() =>
                                this.editItem(null, book.isbn, this.props)
                              }
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant='danger'
                              onClick={() =>
                                this.deleteItem(null, book.isbn, this.props)
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </React.Fragment>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1>There are no books</h1>
          )}
        </Tab>
        <Tab eventKey='authors' title='Authors'>
          {authors && authors.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID (Click to view)</th>
                  <th>Image</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DOB</th>
                  {this.props.currentUser ? (
                    <React.Fragment>
                      <th>Edit</th>
                      <th>Delete</th>
                    </React.Fragment>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => {
                  return (
                    <tr key={author.id}>
                      <td
                        className='display-item'
                        onClick={() =>
                          this.displaySingleItem(author.id, null, this.props)
                        }
                      >
                        {author.id}
                      </td>
                      <td>
                        <img
                          src={
                            author.image && author.image != ''
                              ? author.image
                              : '#'
                          }
                        />
                      </td>
                      <td>{author.firstName}</td>
                      <td>{author.lastName}</td>
                      <td>
                        {new Date(Date.parse(author.dob))
                          .toISOString()
                          .substr(0, 10)}
                      </td>
                      {this.props.currentUser ? (
                        <React.Fragment>
                          <td>
                            <Button
                              variant='primary'
                              onClick={() =>
                                this.editItem(author.id, null, this.props)
                              }
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant='danger'
                              onClick={() =>
                                this.deleteItem(author.id, null, this.props)
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </React.Fragment>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1>There are no authors</h1>
          )}
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ author, book, user }) => ({
  authors: author.authors,
  books: book.books,
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  deleteAuthor: (authorId) => dispatch(deleteAuthor(authorId)),
  deleteBook: (bookId) => dispatch(deleteBook(bookId)),
  getAllAuthors: () => dispatch(getAllAuthors()),
  getAllBooks: () => dispatch(getAllBooks()),
  getSingleAuthor: (authorId) => dispatch(getSingleAuthor(authorId)),
  getSingleBook: (bookId) => dispatch(getSingleBook(bookId)),
  getBooksFromAuthor: (authorId) => dispatch(getBooksFromAuthor(authorId)),
  getAuthorsFromBook: (bookId) => dispatch(getAuthorsFromBook(bookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
