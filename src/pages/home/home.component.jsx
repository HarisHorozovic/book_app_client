import React from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

import SingleItem from '../../components/single-item/single-item.component';

import './home.styles.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [
        {
          isbn: 'dsaffdsdsfa',
          title: 'Test',
          pages: 36,
          published: 1985,
          image: null,
        },
      ],
      authors: [
        {
          id: 'fdsafvdsadsafsafds',
          firstName: 'John',
          lastName: 'Doe',
          dob: '15-03-1985',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        {
          id: 'fdsafvdsadsafsafds',
          firstName: 'John',
          lastName: 'Doe',
          dob: '15-03-1985',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        {
          id: 'fdsafvdsadsafsafds',
          firstName: 'John',
          lastName: 'Doe',
          dob: '15-03-1985',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        {
          id: 'fdsafvdsadsafsafds',
          firstName: 'John',
          lastName: 'Doe',
          dob: '15-03-1985',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        {
          id: 'fdsafvdsadsafsafds',
          firstName: 'John',
          lastName: 'Doe',
          dob: '15-03-1985',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
        {
          id: 'fdsafvdsadsafsafds',
          firstName: 'John',
          lastName: 'Doe',
          dob: '15-03-1985',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        },
      ],
      key: 'books',
    };
  }

  changeKey = (key) => {
    this.setState({ key });
  };
  render() {
    const { books, authors, key } = this.state;
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

export default HomePage;
