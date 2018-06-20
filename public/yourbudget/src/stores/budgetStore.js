import axios from 'axios';


const BUDGET_ADD = 'BUDGET_ADD';
const BUDGET_REMOVE = 'BUDGET_REMOVE';
const BUDGET_GET = 'BUDGET_GET';
const BUDGET_LOADING = 'BUDGET_LOADING';
const BUDGET_ERROR = 'BUDGET_ERROR';


axios.defaults.baseURL = `${window.location.origin}/api/yourbudget/`;


export const addBudget = data => dispatch => {
  dispatch({ type: BUDGET_LOADING, });
  return axios.post('/budget', data)
    .then(res => dispatch({ type: BUDGET_ADD, data: res.data, }))
    .catch(err => {
      dispatch({ type: BUDGET_ERROR, error: err, });
      throw new Error(`There was an error sending api budget add request ${err}`);
    });
};


export const removeBudget = data => dispatch => {
  dispatch({ type: BUDGET_LOADING, });
  return axios.delete('/budget', { data: { ...data, }, })
    .then(res => dispatch({ type: BUDGET_REMOVE, data: res.data, }))
    .catch(err => {
      dispatch({ type: BUDGET_ERROR, error: err, });
      throw new Error(`There was an error sending api budget remove request ${err}`);
    });
};


export const getBudget = () => dispatch => {
  dispatch({ type: BUDGET_LOADING, });
  return axios.get('/budget')
    .then(res => dispatch({ type: BUDGET_GET, data: res.data, }))
    .catch(err => {
      dispatch({ type: BUDGET_ERROR, error: err, });
      throw new Error(`There was an error sending api budget get request ${err}`);
    });
};


const initialState = {
  data: [],
  loading: false,
  error: null,
};


const budgetStore = (state = initialState, action) => {
  switch (action.type) {
  case BUDGET_ADD:
    return {
      ...state,
      type: action.type,
      data: [ ...state.data, action.data, ],
      loading: false,
    };
  case BUDGET_REMOVE:
    state.data.splice(state.data.findIndex(d => d._id === action.data._id), 1);
    return {
      ...state,
      type: action.type,
      data: [ ...state.data, ],
      loading: false,
    };
  case BUDGET_GET:
    return {
      ...state,
      type: action.type,
      data: action.data,
      loading: false,
    };
  case BUDGET_LOADING:
    return {
      ...state,
      loading: true,
    };
  case BUDGET_ERROR:
    return {
      ...state,
      type: action.type,
      error: action.error,
    };
  default:
    return state;
  }
};


export default budgetStore;
