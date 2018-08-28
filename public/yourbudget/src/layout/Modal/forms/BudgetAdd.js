import React from 'react';
import PropTypes from 'prop-types';

import { Form, Field, } from 'components';


export const formType = 'BUDGET_ADD';


export default class BudgetAdd extends React.Component {

  onSubmit = () => {
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit} close={this.props.close}>
        <Field type='text' name={'budgetname'} label={'Gimme ur username'} />
        <Field type='number' name={'amount'} label={'Gimme ur number'} />
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  close: PropTypes.func.isRequired,
};
