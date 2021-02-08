import { BookActionTypes } from './book.types';

const INITIAL_STATE = {
  books: null,
  bookAuthors: null,
  singleBook: null,
  bookError: null,
  bookMessage: null,
};

const bookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookActionTypes.GET_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        bookError: null,
      };
    case BookActionTypes.CREATE_BOOK:
      return {
        ...state,
        bookMessage: action.payload,
      };
    case BookActionTypes.GET_SINGLE_BOOK:
      return {
        ...state,
        singleBook: action.payload,
        bookError: null,
      };
    case BookActionTypes.REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.isbn !== action.payload),
        bookError: null,
      };
    case BookActionTypes.SET_BOOK_ERROR:
      return {
        ...state,
        bookError: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
