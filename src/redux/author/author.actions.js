import axios from 'axios';
import alertify from 'alertifyjs';

import { AuthorActionTypes } from './author.types';

const apiUrl = 'http://localhost:5000/api/v1/authors';

export const getAllAuthors = () => (dispatch) => {
  axios
    .get(`${apiUrl}/`, { withCredentials: true })
    .then((res) => dispatch(getAll(res.data.author)))
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const getSingleAuthor = (authorId) => (dispatch) => {
  return axios
    .get(`${apiUrl}/${authorId}`, { withCredentials: true })
    .then((res) => {
      return dispatch(getSingle(res.data.author));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const createAuthor = (data) => (dispatch) => {
  return axios
    .post(`${apiUrl}/`, data, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(create(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const editAuthor = (authorId, data) => (dispatch) => {
  return axios
    .put(`${apiUrl}/${authorId}`, data, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(update(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const deleteAuthor = (authorId) => (dispatch) => {
  return axios
    .delete(`${apiUrl}/${authorId}`, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(remove(authorId));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const getBooksFromAuthor = (authorId) => (dispatch) => {
  axios
    .get(`${apiUrl}/${authorId}/books`, { withCredentials: true })
    .then((res) => dispatch(getAuthorBooks(res.data.authorBooks)))
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const addBookToAuthor = (authorId, bookId) => (dispatch) => {
  axios
    .post(`${apiUrl}/${authorId}/books`, bookId, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(addBook(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err.response.data));
    });
};

export const removeBookFromAuthor = (authorId, bookId) => (dispatch) => {
  axios
    .delete(`${apiUrl}/${authorId}/books/${bookId}`, { withCredentials: true })
    .then((res) => {
      alertify.success(res.data.message);
      dispatch(removeBook(res.data.message));
    })
    .catch((err) => {
      alertify.error(err.response.data.error);
      dispatch(setAuthorError(err));
    });
};

// Pure functions for redux state
export const getAll = (data) => {
  return {
    type: AuthorActionTypes.GET_ALL_AUTHORS,
    payload: data,
  };
};

export const create = (data) => {
  return {
    type: AuthorActionTypes.CREATE_AUTHOR,
    payload: data,
  };
};

export const remove = (data) => {
  return {
    type: AuthorActionTypes.REMOVE_AUTHOR,
    payload: data,
  };
};

export const update = (data) => {
  return {
    type: AuthorActionTypes.UPDATE_AUTHOR,
    payload: data,
  };
};

export const getSingle = (data) => {
  return {
    type: AuthorActionTypes.GET_SINGLE_AUTHOR,
    payload: data,
  };
};

export const getAuthorBooks = (data) => {
  return {
    type: AuthorActionTypes.GET_BOOKS_FROM_AUTHOR,
    payload: data,
  };
};

export const addBook = (data) => {
  return {
    type: AuthorActionTypes.ADD_BOOK_TO_AUTHOR,
    payload: data,
  };
};

export const removeBook = (data) => {
  return {
    type: AuthorActionTypes.REMOVE_BOOK_FROM_AUTHOR,
    payload: data,
  };
};

export const setAuthorError = (data) => {
  return {
    type: AuthorActionTypes.SET_AUTHOR_ERROR,
    payload: data,
  };
};
