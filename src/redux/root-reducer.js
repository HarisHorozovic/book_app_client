import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import authorReducer from './author/author.reducer';
import bookReducer from './book/book.reducer';

export default combineReducers({
  user: userReducer,
  author: authorReducer,
  book: bookReducer,
});
