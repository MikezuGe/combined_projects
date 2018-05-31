import { createStore, combineReducers, applyMiddleware, } from 'redux';
import ReduxThunk from 'redux-thunk';

/* Import stores and actions */
import budgetStore, { addBudget, removeBudget, getBudget, } from './budgetstore';


/* Create store */
const store = createStore(
  combineReducers({
    budgetStore,
  }),
  applyMiddleware(ReduxThunk),
);


export {
  addBudget,
  removeBudget,
  getBudget,
};


export default store;
