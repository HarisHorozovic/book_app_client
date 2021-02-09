import React from 'react';
import { connect } from 'react-redux';

import './book-page.styles.css';

import SingleItem from '../../components/single-item/single-item.component';

const BookPage = ({ singleBook, bookAuthors }) => {
  return (
    <div className='book-page'>
      <SingleItem item={singleBook} authors={bookAuthors} />
    </div>
  );
};

const mapStateToProps = ({ book }) => ({
  singleBook: book.singleBook,
  bookAuthors: book.bookAuthors,
});

export default connect(mapStateToProps)(BookPage);
