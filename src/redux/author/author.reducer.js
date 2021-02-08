import { AuthorActionTypes } from './author.types';

const INITIAL_STATE = {
  authors: null,
  authorsBooks: null,
  singleAuthor: null,
  authorError: null,
  authorMessage: null,
};

const authorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthorActionTypes.GET_ALL_AUTHORS:
      return {
        ...state,
        authors: action.payload,
        authorMessage: null,
        singleAuthor: null,
        authorBooks: null,
        authorError: null,
      };
    case AuthorActionTypes.CREATE_AUTHOR:
      return {
        ...state,
        authorMessage: action.payload,
        singleAuthor: null,
        authorBooks: null,
        authorError: null,
      };

    case AuthorActionTypes.GET_SINGLE_AUTHOR:
      return {
        ...state,
        singleAuthor: action.payload,
        authorError: null,
      };
    case AuthorActionTypes.REMOVE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter((author) => author.id !== action.payload),
        authorMessage: null,
        singleAuthor: null,
        authorBooks: null,
        authorError: null,
      };
    case AuthorActionTypes.SET_AUTHOR_ERROR:
      return {
        ...state,
        authorError: action.payload,
        authorMessage: null,
        singleAuthor: null,
        authorBooks: null,
      };
    default:
      return state;
  }
};

export default authorReducer;
