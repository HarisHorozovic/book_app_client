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
    case BookActionTypes.UPDATE_BOOK:
      return {
        ...state,
        bookMessage: action.payload,
        bookError: null,
      };
    case BookActionTypes.ADD_AUTHOR_TO_BOOK:
      return {
        ...state,
        bookMessage: action.payload,
        bookError: null,
      };
    case BookActionTypes.GET_AUTHORS_FROM_BOOK:
      return {
        ...state,
        bookAuthors: action.payload,
        bookError: null,
      };
    case BookActionTypes.REMOVE_AUTHOR_FROM_BOOK:
      return {
        ...state,
        bookMessage: action.payload,
        bookError: null,
      };
    case BookActionTypes.SET_BOOK_ERROR:
      return {
        ...state,
        bookError: action.payload,
        bookMessage: null,
      };
    default:
      return state;
  }
};

export default bookReducer;
