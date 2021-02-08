import axios from 'axios';

import { AuthorActionTypes } from './author.types';

const apiUrl = 'http://localhost:5000/api/v1/authors';

export const getAllAuthors = () => (dispatch) => {
  axios
    .get(`${apiUrl}/`, { withCredentials: true })
    .then((res) => dispatch(getAll(res.data.author)))
    .catch((err) => dispatch(setAuthorError(err.response.data)));
};

export const getSingleAuthor = (authorId) => (dispatch) => {
  return axios
    .get(`${apiUrl}/${authorId}`, { withCredentials: true })
    .then((res) => dispatch(getSingle(res.data.author)))
    .catch((err) => dispatch(setAuthorError(err.response.data)));
};

export const createAuthor = (data) => (dispatch) => {
  return axios
    .post(`${apiUrl}/`, data, { withCredentials: true })
    .then((res) => dispatch(create(res.data.message)))
    .catch((err) => dispatch(setAuthorError(err.response.data)));
};

export const editAuthor = (authorId, data) => (dispatch) => {
  return axios
    .put(`${apiUrl}/${authorId}`, data, { withCredentials: true })
    .then((res) => console.log(res))
    .catch((err) => dispatch(setAuthorError(err.response.data)));
};

export const deleteAuthor = (authorId) => (dispatch) => {
  return axios
    .delete(`${apiUrl}/${authorId}`, { withCredentials: true })
    .then((res) => dispatch(remove(authorId)))
    .catch((err) => dispatch(setAuthorError(err.response.data)));
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

export const getSingle = (data) => {
  return {
    type: AuthorActionTypes.GET_SINGLE_AUTHOR,
    payload: data,
  };
};

export const setAuthorError = (data) => {
  return {
    type: AuthorActionTypes.SET_AUTHOR_ERROR,
    payload: data,
  };
};
