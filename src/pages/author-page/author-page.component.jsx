import React from 'react';
import { connect } from 'react-redux';

import './author-page.styles.css';

import SingleItem from '../../components/single-item/single-item.component';

const AuthorPage = ({ singleAuthor, authorsBooks }) => {
  return (
    <div className='author-page'>
      <SingleItem item={singleAuthor} books={authorsBooks} />
    </div>
  );
};

const mapStateToProps = ({ author }) => ({
  singleAuthor: author.singleAuthor,
  authorsBooks: author.authorsBooks,
});

export default connect(mapStateToProps)(AuthorPage);
