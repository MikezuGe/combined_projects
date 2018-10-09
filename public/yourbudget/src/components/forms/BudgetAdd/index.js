import React from 'react';
//import propTypes from 'prop-types';
import styled from 'styled-components';

import { Form, } from '../../organisms';
import { Field, } from '../../molecules';


const Button = styled.button`
background: lime;
`;


class BudgetAdd extends React.Component {

  handleSubmit = fields => {
    console.log(fields); //eslint-disable-line
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Field name='name' type='text' label='name' />
        <Field name='password' type='password' label='password' />
        <Button>Submit!</Button>
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  
};


export default BudgetAdd;
