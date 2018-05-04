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

class BudgetAdd extends Component {

  formSubmit = e => {
    // eslint-disable-next-line
    console.log(e);
  }

  render () {
    return (
      <form className={'form'} onSubmit={this.formSubmit}>
        <div className={'form_field'}>
          <label htmlFor='name_input' className={'form_label'}>{'Name:'}</label>
          <input id='name_input' className={'form_input'} type='text' placeholder={'example-name'}></input>
          <label id='name_error' htmlFor='name_input' className={'form_error'}></label>
        </div>
        <div className={'form_field'}>
          <label htmlFor='amount_input' className={'form_label'}>{'Amount:'}</label>
          <input id='amount_input' className={'form_input'} type='text' placeholder={'xxx,xx'}></input>
          <label id='amount_error' htmlFor='amount_input' className={'form_error'}></label>
        </div>
        <div className={'form_field'}>
          <label htmlFor='date_input' className={'form_label'}>{'Date:'}</label>
          <input id='date_input' className={'form_input'} type='date' placeholder={/*Current date here*/'asd'}></input>
          <label id='date_error' htmlFor='date_input' className={'form_error'}></label>
        </div>
        <div className={'form_field'}>
          <label htmlFor='isincome_input' className={'form_label'}>{'Is income:'}</label>
          <input id='isincome_input' className={'form_input'} type='checkbox' placeholder={'example-name'}></input>
          <label id='isincome_error' htmlFor='isincome_input' className={'form_error'}></label>
        </div>
        <div className={'form_field'}>
          <button type='submit' className={'form_submit_button'}>{'Submit and add'}</button>
          <button type='submit' className={'form_submit_button'}>{'Submit and close'}</button>
        </div>
      </form>
    );
  }

}


BudgetAdd.propTypes = {
  addBudget: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  loading: state.budgetStore.loading,
});

const mapDispatchToProps = dispatch => ({
  addBudget: data => dispatch(addBudget(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(BudgetAdd);
