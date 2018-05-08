import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';

import '../../css/modalforms/common.css';
import '../../css/modalforms/budgetadd.css';

import { addBudget, } from '../redux';


export const budgetAddModalForm = 'BUDGET_ADD_MODAL_FORM';

/*
const firstLetterToUpperCase = word => word.charAt(0).toUpperCase() + word.slice(1);
*/
/*
const validate = ({ name, amount, date, }) => {
  const errors = {};

  if (!name) {
    errors.name = 'Required';
  } else if (name.length < 3) {
    errors.name = 'Must be at least 3 characters';
  } else if (/[^a-zåäö.,\-_']/i.test(name)) {
    errors.name = 'Allowed characters: a-zåäöA-ZÅÄÖ.,-_\'';
  }

  if (!amount) {
    errors.amount = 'Required';
  } else if (/[^0-9.,]/i.test(amount)) {
    errors.amount = 'Must be a number';
  } else {
    const dotIndex = amount.indexOf('.');
    if (dotIndex < 0 || amount.length - 1 - dotIndex !== 2) {
      errors.amount = 'Must be in form -xx.xx';
    }
  }

  if (!date) {
    errors.date = 'Required';
  }

  return errors;
};
*/
const getNameValuePair = input => {
  const nameValuePair = {};
  const { name, value, checked, } = input;
  nameValuePair.name = name;
  nameValuePair.value = value || checked;
  return nameValuePair;
}


class BudgetAdd extends Component {

  onChangeHandler = e => {
    // eslint-disable-next-line
    console.log(e);
  }

  formSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const nameValuePairs = [];
    for (const input of form) {
      nameValuePairs.push(getNameValuePair(input));
    }
    // eslint-disable-next-line
    console.log(nameValuePairs);
  }

  render = () => <form className='form' onSubmit={this.formSubmit}>
      <div className='form_field'>
        <label htmlFor='name_input' className='form_label'>{'Name:'}</label>
        <input name='name' className='form_input' type='text' placeholder='example-name' value='test' onChange={this.onChangeHandler}></input>
        <label id='name_error' htmlFor='name_input' className='form_error'></label>
      </div>
      <div className='form_field'>
        <label htmlFor='amount_input' className='form_label'>{'Amount:'}</label>
        <input name='amount' className='form_input' type='text' placeholder='xxx,xx' value='14,55' onChange={this.onChangeHandler}></input>
        <label id='amount_error' htmlFor='amount_input' className='form_error'></label>
      </div>
      <div className='form_field'>
        <label htmlFor='date_input' className='form_label'>{'Date:'}</label>
        <input name='date' className='form_input' type='date' value='2018-05-05' onChange={this.onChangeHandler}></input>
        <label id='date_error' htmlFor='date_input' className='form_error'></label>
      </div>
      <div className='form_field switch'>
        <label htmlFor='isincome_input' className='form_label switch_label'>{'Expense'}</label>
        <input name='isincome' className='form_input hidden' type='checkbox'></input>
        <label htmlFor='isincome_input' className='switch_toggle'></label>
        <label htmlFor='isincome_input' className='form_label switch_label'>{'Income'}</label>
      </div>
      <div className='form_field submit'>
        <button type='submit' className='form_submit_button'>{'Submit and add'}</button>
        <button type='submit' className='form_submit_button'>{'Submit and close'}</button>
      </div>
    </form>;

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
