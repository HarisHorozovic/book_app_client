import React from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import SingleItem from '../../components/single-item/single-item.component';

import './home.styles.css';

import { getAllAuthors } from '../../redux/author/author.actions';
import { getAllBooks } from '../../redux/book/book.actions';

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
          <Container>
            <Row>
              {books && books.length > 0 ? (
                books.map((book) => {
                  return (
                    <Col
                      sm='12'
                      md='4'
                      lg='3'
                      key={book.isbn}
                      className='item-column'
                    >
                      <SingleItem item={book} />
                    </Col>
                  );
                })
              ) : (
                <h1>There are no books</h1>
              )}
            </Row>
          </Container>
        </Tab>
        <Tab eventKey='authors' title='Authors'>
          <Container>
            <Row>
              {authors && authors.length > 0 ? (
                authors.map((author) => {
                  return (
                    <Col
                      sm='12'
                      md='4'
                      lg='3'
                      key={author.id}
                      className='item-column'
                    >
                      <SingleItem item={author} />
                    </Col>
                  );
                })
              ) : (
                <h1>There are no authors</h1>
              )}
            </Row>
          </Container>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = ({ author, book }) => ({
  authors: author.authors,
  books: book.books,
});
const mapDispatchToProps = (dispatch) => ({
  getAllAuthors: () => dispatch(getAllAuthors()),
  getAllBooks: () => dispatch(getAllBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
