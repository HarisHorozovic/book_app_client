import React from 'react';

import AuthorForm from '../../components/author-form/author-form.component';

import './edit-author.styles.css';

class EditAuthor extends React.Component {
  render() {
    return (
      <div className='edit-author-page'>
        <AuthorForm />
      </div>
    );
  }
}

export default EditAuthor;
