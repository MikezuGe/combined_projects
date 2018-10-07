import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { Form, } from '../../organisms';
import { Field, } from '../../molecules';


class BudgetAdd extends React.Component {

  handleSubmit = fields => {
    console.log(fields);
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Field name='name' type='text' label='name' />
        <Field name='password' type='password' label='password' />
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  
};


export default BudgetAdd;
