import React from 'react';
import PropTypes from 'prop-types';

import { Form, Field, } from '../../../components/organisms';


export const formType = 'BUDGET_ADD';


export default class BudgetAdd extends React.Component {

  onSubmit = () => {
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit} onClose={this.props.close}>
        <Field type='text' name={'budgetname'} label={'Gimme ur username'} />
        <Field type='number' name={'amount'} label={'Gimme ur number'} />
        <Field type='submit' value={'Submit & add'} submit />
        <Field type='submit' value={'Submit & close'} submit close />
        <Field type='submit' value={'Close'} close />
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  close: PropTypes.func.isRequired,
};
