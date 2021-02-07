import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import BookForm from '../../components/book-form/book-form.component';
import AuthorForm from '../../components/author-form/author-form.component';

import './manage-item-page.styles.css';

class ManageItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'books',
    };
  }
  render() {
    return (
      <Tabs
        className='manage-item-page'
        id='manageItemPage'
        defaultActiveKey='books'
        transition={false}
        activeKey={this.state.key}
        onSelect={(key) => this.setState({ key })}
      >
        <Tab eventKey='books' title='Book'>
          <BookForm />
        </Tab>
        <Tab eventKey='authors' title='Author'>
          <AuthorForm />
        </Tab>
      </Tabs>
    );
  }
}

export default ManageItemPage;
