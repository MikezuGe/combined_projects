import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';

import 'css/modalforms/common.css';
import 'css/modalforms/budgetadd.css';

import { addBudget, } from 'js/redux';
import Form, { Field, } from 'js/components/forms';
import parseDate from 'js/utility/parsedate';


export const BUDGET_ADD_MODAL_FORM = 'BUDGET_ADD_MODAL_FORM';


const validateName = field => {
  const value = field.value;
  if (value === '') {
    field.error = 'Not specified';
  } else if (/[^a-zåäö\-.,_ ]+/gi.test(value)) {
    field.error = 'Allowed characters: A-Z a-z å ä ö - . , _ and spaces';
  } else {
    field.error = '';
  }
};


const validateAmount = field => {
  const value = field.value;
  if (value === '') {
    field.error = 'Not specified';
  } else if (Number.isNaN(Number(value))) {
    field.error = 'Not a number';
  } else if (!/^\d*(?:[.,]\d?\d?)?$/.test(value)) {
    field.error = 'Must be of form: ...xxx.xx';
  } else {
    field.error = '';
  }
};


const validateDate = field => {
  const value = field.value;
  if (value === '') {
    field.error = 'Not specified';
  } else {
    field.error = '';
  }
};


class BudgetAdd extends Component {

  submit = () => {

  }

  render = () => {
    return <Form submit={this.submit}>
      { Field({ type: 'text', name: 'name', initialValue: '', placeholder: 'example-name', validate: validateName, }) }
      { Field({ type: 'text', name: 'amount', initialValue: '', placeholder: 'xxx.xx', validate: validateAmount, }) }
      { Field({ type: 'date', name: 'date', initialValue: parseDate(new Date(), 'YYYY-MM-DD'), validate: validateDate, }) }
      { Field({ type: 'toggle', name: 'isIncome', initialValue: true, onValue: 'Income', offValue: 'Expense', }) }
      <div className='form_field submit'>
        { /*<button type='submit' className='form_submit_button' onClick={(e) => { submit(e, SUBMIT_ADD); }}>{'Submit and add'}</button>
        <button type='submit' className='form_submit_button' onClick={(e) => { submit(e, SUBMIT_CLOSE); }}>{'Submit and close'}</button>
  <button type='submit' className='form_submit_button' onClick={(e) => { submit(e, CANCEL); }}>{'Cancel'}</button> */}
      </div>
    </Form>;
  }
}


BudgetAdd.propTypes = {
  addBudget: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  loading: state.budgetStore.loading,
});

const mapDispatchToProps = dispatch => ({
  addBudget: data => dispatch(addBudget(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(BudgetAdd);
