import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import MainNav from './components/main-nav/main-nav.component';

import HomePage from './pages/home/home.component';
import AuthPage from './pages/auth-page/auth.component.jsx';
import CreateItemPage from './pages/create-item-page/create-item-page.component';
import EditAuthor from './pages/edit-author/edit-author.component';
import EditBook from './pages/edit-book/edit-book.component';

import { checkLogin } from './redux/user/user.actions';

class App extends React.Component {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.checkLogin();
    }
  }
  render() {
    return (
      <div className='App'>
        <MainNav />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            exact
            path='/auth'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <AuthPage />
            }
          />
          <Route exact path='/create' component={CreateItemPage} />
          <Route path='/edit-author/:authorId' component={EditAuthor} />
          <Route path='/edit-book/:bookId' component={EditBook} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkLogin: () => dispatch(checkLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
