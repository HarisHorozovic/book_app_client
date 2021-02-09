import React from 'react';

import BookForm from '../../components/book-form/book-form.component';

import './edit-book.styles.css';

class EditBook extends React.Component {
  render() {
    return (
      <div className='edit-book-page'>
        <BookForm type='edit' />
      </div>
    );
  }
}

export default EditBook;
