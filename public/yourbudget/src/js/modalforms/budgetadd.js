import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import { Field, reduxForm, } from 'redux-form';
import PropTypes from 'prop-types';

import '../../css/modalforms/common.css';
import '../../css/modalforms/budgetadd.css';

import { addBudget, } from '../redux';


export const budgetAddModalForm = 'BUDGET_ADD_MODAL_FORM';


const firstLetterToUpperCase = word => word.charAt(0).toUpperCase() + word.slice(1);


const fieldComponent = ({ type, placeholder, input, meta: { touched, error, }, }) => type === 'checkbox'
  ? <div className={'commonfield'}>
    <div className={'switchlabel'}>{'Income'}</div>
    <div className={'switchcontainer'}>
      <input className={'switchinput'} {...input} type={type} placeholder={placeholder} />
      <div className={'switchvisible'} />
    </div>
    <div className={'switchlabel'}>{'Expense'}</div>
  </div>
  : <div className={'commonfield'}>
    <div className={'fieldname'}>{`${firstLetterToUpperCase(input.name)}:`}</div>
    <input className={'fieldinput'} {...input} type={type} placeholder={placeholder} />
    <div className={'fielderror'}>{ touched && error || '' }</div>
  </div>;


fieldComponent.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};


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


class BudgetAdd extends Component {

  formSubmit = values => {
    console.log(values);
  }

  render () {
    return (
      <form className={'commonform budgetadd'} onSubmit={this.props.handleSubmit(this.formSubmit)}>
        <Field name='name' component={fieldComponent} type='text' placeholder='example-name' />
        <Field name='amount' component={fieldComponent} type='text' placeholder='-xx.xx' />
        <Field name='date' component={fieldComponent} type='date' />
        <Field name='isIncome' component={fieldComponent} type='checkbox' />
        <div className={'commonfield'}>
          <button type='submit'>{'Submit and add'}</button>
          <button type='submit'>{'Submit and close'}</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'budgetAdd',
  validate,
})(BudgetAdd));
