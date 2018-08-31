import React from 'react';
import PropTypes from 'prop-types';

import { Form, Field, } from 'components';


export const formType = 'LOGIN';


export default class BudgetAdd extends React.Component {

  onSubmit = () => {
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit} close={this.props.close}>
        <Field type='text' name={'email'} label={'Gimme ur email'} />
        <Field type='password' name={'password'} label={'Gimme ur password'} />
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  close: PropTypes.func.isRequired,
};
