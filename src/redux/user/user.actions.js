import axios from 'axios';

import { UserActionTypes } from './user.types';

const apiUrl = 'http://localhost:5000/api/v1/auth';

export const login = (data) => (dispatch) => {
  return axios
    .post(`${apiUrl}/login`, data, { withCredentials: true })
    .then((res) => dispatch(setCurrentUser(res.data.user)))
    .catch((err) => dispatch(setUserError(err.response.data)));
};

export const register = (data) => (dispatch) => {
  console.log(data);
  return axios
    .post(`${apiUrl}/register`, data, { withCredentials: true })
    .then((res) => dispatch(setCurrentUser(res.data.user)))
    .catch((err) => dispatch(setUserError(err.response.data)));
};

export const checkLogin = () => (dispatch) => {
  return axios
    .get(`${apiUrl}/is-logged-in`, { withCredentials: true })
    .then((res) => dispatch(setCurrentUser(res.data.user)))
    .catch((err) => dispatch(setUserError(err.response.data)));
};

export const logout = () => (dispatch) => {
  return axios
    .get(`${apiUrl}/logout`, { withCredentials: true })
    .then((res) => dispatch(removeCurrentUser()))
    .catch((err) => dispatch(setUserError(err.response.data)));
};

// Pure functions for handling state
export const setCurrentUser = (data) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: data,
});

export const removeCurrentUser = () => ({
  type: UserActionTypes.REMOVE_CURRENT_USER,
});

export const setUserError = (data) => ({
  type: UserActionTypes.SET_USER_ERROR,
  payload: data,
});
