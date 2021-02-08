import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BookForm from '../../components/book-form/book-form.component';

import { getSingleBook } from '../../redux/book/book.actions';

import './edit-book.styles.css';

class EditBook extends React.Component {
  render() {
    return (
      <div className='edit-book-page'>
        <BookForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSingleBook: (bookId) => dispatch(getSingleBook(bookId)),
});

export default connect(null, mapDispatchToProps)(withRouter(EditBook));
