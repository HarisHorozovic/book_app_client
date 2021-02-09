import axios from 'axios';
import alertify from 'alertifyjs';

import { BookActionTypes } from './book.types';

const apiUrl = 'http://localhost:5000/api/v1/books';

export const getAllBooks = () => (dispatch) => {
  return axios
    .get(`${apiUrl}/`, { withCredentials: true })
    .then((res) => dispatch(getAll(res.data.books)))
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const getSingleBook = (bookId) => (dispatch) => {
  return axios
    .get(`${apiUrl}/${bookId}`, { withCredentials: true })
    .then((res) => dispatch(getSingle(res.data.book)))
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const createBook = (data) => (dispatch) => {
  return axios
    .post(`${apiUrl}/`, data, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      return dispatch(create(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const editBook = (bookId, data) => (dispatch) => {
  return axios
    .put(`${apiUrl}/${bookId}`, data, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      return dispatch(update(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const deleteBook = (bookId) => (dispatch) => {
  return axios
    .delete(`${apiUrl}/${bookId}`, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      return dispatch(remove(bookId));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const getAuthorsFromBook = (bookId) => (dispatch) => {
  axios
    .get(`${apiUrl}/${bookId}/authors`, { withCredentials: true })
    .then((res) => dispatch(getAuthors(res.data.bookAuthors)))
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const addAuthorToBook = (bookId, authorId) => (dispatch) => {
  axios
    .post(`${apiUrl}/${bookId}/authors`, authorId, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(addAuthor(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

export const removeAuthorFromBook = (bookId, authorId) => (dispatch) => {
  axios
    .delete(`${apiUrl}/${bookId}/authors/${authorId}`, {
      withCredentials: true,
    })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(removeAuthor(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      return dispatch(setBookError(err.response.data));
    });
};

// Pure functions for redux state
export const getAll = (data) => {
  return {
    type: BookActionTypes.GET_ALL_BOOKS,
    payload: data,
  };
};

export const create = (data) => {
  return {
    type: BookActionTypes.CREATE_BOOK,
    payload: data,
  };
};

export const remove = (bookId) => {
  return {
    type: BookActionTypes.REMOVE_BOOK,
    payload: bookId,
  };
};

export const update = (data) => {
  return {
    type: BookActionTypes.UPDATE_BOOK,
    payload: data,
  };
};

export const getSingle = (data) => {
  return {
    type: BookActionTypes.GET_SINGLE_BOOK,
    payload: data,
  };
};

export const getAuthors = (data) => {
  return {
    type: BookActionTypes.GET_AUTHORS_FROM_BOOK,
    payload: data,
  };
};

export const addAuthor = (data) => {
  return {
    type: BookActionTypes.ADD_AUTHOR_TO_BOOK,
    payload: data,
  };
};

export const removeAuthor = (data) => {
  return {
    type: BookActionTypes.REMOVE_AUTHOR_FROM_BOOK,
    payload: data,
  };
};

export const setBookError = (data) => {
  return {
    type: BookActionTypes.SET_BOOK_ERROR,
    payload: data,
  };
};
