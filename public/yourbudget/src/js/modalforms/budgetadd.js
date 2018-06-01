import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';

import '../../css/modalforms/common.css';
import '../../css/modalforms/budgetadd.css';

import { addBudget, } from '../redux';
import { TextField, DateField, ToggleSwitchField, } from '../components/forms';
import parseDate from '../utility/parsedate';


export const budgetAddModalForm = 'BUDGET_ADD_MODAL_FORM';


const SUBMIT_ADD = 'SUBMIT_ADD';
const SUBMIT_CLOSE = 'SUBMIT_CLOSE';
const CANCEL = 'CANCEL';


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


const isValid = fields => {
  let valid = true;
  for (const field of fields) {
    if (field.meta) {
      field.meta.submitted = true;
      field.meta.changed = false;
    }
    if (field.validate) {
      field.validate(field);
      if (field.error !== '') {
        valid = false;
      }
    }
  }
  return valid;
};


const meta = { pristine: true, touched: false, changed: false, submitted: false, };


class BudgetAdd extends Component {

  state = {
    fields: [
      { type: 'text', name: 'name', value: '', placeholder: 'example-name', error: '', validate: validateName, meta: { ...meta }, },
      { type: 'text', name: 'amount', value: '', placeholder: 'xxx.xx', error: '', validate: validateAmount, meta: { ...meta }, },
      { type: 'date', name: 'date', value: parseDate(new Date(), 'YYYY-MM-DD'), error: '', validate: validateDate, meta: { ...meta }, },
      { type: 'toggle', name: 'isIncome', value: true, onValue: 'Income', offValue: 'Expense', },
    ],
  }

  onChangeHandler = (e, i) => {
    const { value, checked, } = e.target;
    this.setState(prevState => {
      const field = prevState.fields[i];
      field.value = field.type === 'toggle' ? checked : value;
      if (field.meta) {
        field.meta.changed = true;
        field.meta.touched = true;
        field.meta.pristine = false;
      }
      return prevState;
    });
  }

  submit = (e, btn) => {
    e.preventDefault();
    switch (btn) {
      case SUBMIT_ADD:
        this.formSubmit(false);
        break;
      case SUBMIT_CLOSE:
        this.formSubmit(true)
        break;
      case CANCEL:
        this.props.close('force');
        break;
      default: break;
    }
  }

  formSubmit = shouldClose => {
    const fields = this.state.fields;
    if (isValid(fields)) {
      const values = fields
        .map(input => ({ name: input.name, value: input.value, }))
        .reduce((total, current) => {
          total[current.name] = current.value;
          return total;
        }, {});
      this.props.addBudget(values)
        .then(() => {
          if (shouldClose) {
            this.props.close('force');
          } else {
            this.clearForm();
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
          // DISPLAY ERROR
        });
    } else {
      this.setState({ fields: [ ...fields ], });
    }
  }

  clearForm = () => {
    this.setState(prevState => {
      return {
        fields: [ ...prevState.fields.map(field => {
          if (field.name === 'isIncome') {
            return field;
          }
          field.value = '';
          return field;
        }) ],
      };
    });
  }

  render = () => {
    const { onChangeHandler, submit, state: { fields, }, } = this;
    return <form className='form'>
      {fields.map((field, i) => {
        switch (field.type) {
          case 'text': return <TextField key={field.name} name={field.name} value={field.value} error={field.error} meta={field.meta} onChange={e => { onChangeHandler(e, i) }} placeholder={field.placeholder} />;
          case 'date': return <DateField key={field.name} name={field.name} value={field.value} error={field.error} meta={field.meta} onChange={e => { onChangeHandler(e, i) }} />;
          case 'toggle': return <ToggleSwitchField key={field.name} name={field.name} value={field.value} onChange={e => { onChangeHandler(e, i) }} onValue={field.onValue} offValue={field.offValue} />;
          default: throw new Error(`No such form field type: ${field.type}`);
        }
      })}
      <div className='form_field submit'>
        <button type='submit' className='form_submit_button' onClick={(e) => { submit(e, SUBMIT_ADD); }}>{'Submit and add'}</button>
        <button type='submit' className='form_submit_button' onClick={(e) => { submit(e, SUBMIT_CLOSE); }}>{'Submit and close'}</button>
        <button type='submit' className='form_submit_button' onClick={(e) => { submit(e, CANCEL); }}>{'Cancel'}</button>
      </div>
    </form>;
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
