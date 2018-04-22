import { createStore, combineReducers, applyMiddleware, } from 'redux';
import { reducer as formReducer, } from 'redux-form';
import ReduxThunk from 'redux-thunk';

/* Import stores and actions */
import budgetStore, { addBudget, removeBudget, getBudget, } from './budgetstore';


/* Create store */
const store = createStore(
  combineReducers({
    budgetStore,
    form: formReducer,
  }),
  applyMiddleware(ReduxThunk),
);


export {
  addBudget,
  removeBudget,
  getBudget,
};

export default store;
