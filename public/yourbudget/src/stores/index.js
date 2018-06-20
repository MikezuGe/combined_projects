import { createStore, combineReducers, applyMiddleware, } from 'redux';
import ReduxThunk from 'redux-thunk';

/* Import stores and actions */
import authStore, { createUser, login, logout, } from './authStore';
import budgetStore, { addBudget, removeBudget, getBudget, } from './budgetStore';


/* Create store */
const store = createStore(
  combineReducers({
    authStore,
    budgetStore,
  }),
  applyMiddleware(ReduxThunk),
);


export {
  createUser,
  login,
  logout,
  addBudget,
  removeBudget,
  getBudget,
};


export default store;
