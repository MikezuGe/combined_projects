import axios from 'axios';

const BUDGET_ADD = 'BUDGET_ADD';
const BUDGET_REMOVE = 'BUDGET_REMOVE';
const BUDGET_GET = 'BUDGET_GET';
const BUDGET_LOADING = 'BUDGET_LOADING';
const BUDGET_ERROR = 'BUDGET_ERROR';


axios.defaults.baseURL = 'http://localhost/yourbudget/';

export const addBudget = budget => dispatch => {
  dispatch({ type: BUDGET_LOADING, });
  return axios.post('/budget', budget)
    .then(res => dispatch({ type: BUDGET_ADD, data: res.data, }))
    .catch(err => {
      dispatch({ type: BUDGET_ERROR, error: err, });
      throw new Error(`There was an error sending api budget add request\n${err}`);
    });
};

export const removeBudget = id => dispatch => {
  dispatch({ type: BUDGET_LOADING, });
  return axios.delete('/budget', { params: { id, }, })
    .then(() => dispatch({ type: BUDGET_REMOVE, data: id, }))
    .catch(err => {
      dispatch({ type: BUDGET_ERROR, error: err, });
      throw new Error(`There was an error sending api budget remove request\n${err}`);
    });
};

export const getBudget = () => dispatch => {
  dispatch({ type: BUDGET_LOADING, });
  return axios.get('/budget')
    .then(res => dispatch({ type: BUDGET_GET, data: res.data, }))
    .catch(err => {
      dispatch({ type: BUDGET_ERROR, error: err, });
      throw new Error(`There was an error sending api budget get request\n${err}`);
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
    state.data.splice(state.data.findIndex(d => d.id === action.data), 1);
    return {
      ...state,
      type: action.type,
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
