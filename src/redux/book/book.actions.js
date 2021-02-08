import axios from 'axios';

import { BookActionTypes } from './book.types';

const apiUrl = 'http://localhost:5000/api/v1/books';

export const getAllBooks = () => (dispatch) => {
  return axios
    .get(`${apiUrl}/`, { withCredentials: true })
    .then((res) => dispatch(getAll(res.data.books)))
    .catch((err) => dispatch(setBookError(err.response.data)));
};

export const getSingleBook = (bookId) => (dispatch) => {
  return axios
    .get(`${apiUrl}/${bookId}`, { withCredentials: true })
    .then((res) => dispatch(getSingle(res.data.book)))
    .catch((err) => dispatch(setBookError(err.response.data)));
};

export const createBook = (data) => (dispatch) => {
  return axios
    .post(`${apiUrl}/`, data, { withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => dispatch(setBookError(err.response.data)));
};

export const editBook = (bookId, data) => (dispatch) => {
  return axios
    .put(`${apiUrl}/${bookId}`, data, { withCredentials: true })
    .then((res) => console.log(res.data))
    .catch((err) => dispatch(setBookError(err)));
};

export const deleteBook = (bookId) => (dispatch) => {
  return axios
    .delete(`${apiUrl}/${bookId}`, { withCredentials: true })
    .then((res) => dispatch(remove(bookId)))
    .catch((err) => dispatch(setBookError(err.response.data)));
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

export const getSingle = (data) => {
  return {
    type: BookActionTypes.GET_SINGLE_BOOK,
    payload: data,
  };
};

export const setBookError = (data) => {
  return {
    type: BookActionTypes.SET_BOOK_ERROR,
    payload: data,
  };
};
