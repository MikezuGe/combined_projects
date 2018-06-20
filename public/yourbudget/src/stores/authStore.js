import axios from 'axios';


const AUTH_CREATE_USER = 'AUTH_LOADING';
const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_LOADING = 'AUTH_LOADING';
const AUTH_ERROR = 'AUTH_ERROR';


axios.defaults.baseURL = `${window.location.origin}/api/yourbudget/`;


export const createUser = data => dispatch => {
  dispatch({ type: AUTH_LOADING, });
  return axios.post('/user', data)
    .then(res => dispatch({ type: AUTH_CREATE_USER, data: res.data, }))
    .catch(err => {
      dispatch({ type: AUTH_ERROR, error: err, });
      throw new Error(`There was an error sending api create user request ${err}`);
    });
};


export const login = data => dispatch => {
  dispatch({ type: AUTH_LOADING, });
  return axios.post('/login', data)
    .then(res => dispatch({ type: AUTH_LOGIN, data: res.data, }))
    .catch(err => {
      dispatch({ type: AUTH_ERROR, error: err, });
      throw new Error(`There was an error sending api login request ${err}`);
    });
};


export const logout = data => dispatch => {
  dispatch({ type: AUTH_LOADING, });
  return axios.post('/logout', data)
    .then(res => dispatch({ type: AUTH_LOGOUT, data: res.data, }))
    .catch(err => {
      dispatch({ type: AUTH_ERROR, error: err, });
      throw new Error(`There was an error sending api logout request ${err}`);
    });
};


const initialState = {
  type: '',
  loading: false,
  sessionId: '',
  error: null,
};


const authStore = (state = initialState, action) => {
  switch (action.type) {
  case AUTH_CREATE_USER:
    return {
      ...state,
      type: action.type,
      loading: false,
    }
  case AUTH_LOGIN:
    return {
      ...state,
      type: action.type,
      sessionId: action.data,
      loading: false,
    };
  case AUTH_LOGOUT:
    return {
      ...state,
      type: action.type,
      sessionId: '',
      loading: false,
    };
  case AUTH_LOADING:
    return {
      ...state,
      loading: true,
    };
  case AUTH_ERROR:
    return {
      ...state,
      type: action.type,
      error: action.error,
    };
  default:
    return state;
  }
};


export default authStore;
