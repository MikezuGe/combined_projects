import React from 'react';
import styled from 'styled-components';

import { Form, } from '../../organisms';
import { Field, } from '../../molecules';


const Button = styled.button`
background: lime;
`;


const validateName = t => {
  if (!t) {
    return 'Name not defined';
  } else if (t.length < 1) {
    return 'Name too short';
  } else if (!/^[a-z0-9-_,. ]+$/gi.test(t)) {
    return 'Allowed characters a-z0-9_-,.';
  }
};

const validateAmount = t => {
  if (!t) {
    return 'Amount not defined';
  } else if (isNaN(t)) {
    return 'Must be a number';
  } else if (!/^[0-9]*[.,][0-9]{0,2}$/gi.test(t)) {
    return 'Must be defined as xxx,xx';
  }
}


class BudgetAdd extends React.Component {

  handleSubmit = fields => {
    console.log(fields); //eslint-disable-line
    // if operation was successfull, return true, else false
    return Math.floor(Math.random() * 2); // for now, return randomly 1 or 0 (true or false)
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Field name='name' type='text' label='Name' placeholder='eg. Prisma Kokkola' validate={validateName} />
        <Field name='amount' type='text' label='Amount' placeholder='xxx,xx' validate={validateAmount} />
        <Field name='isIncome' type='checkbox' placeholder='xxx,xx' offValue={'Income'} onValue={'Expense'} toggle />
        <Button>Submit!</Button>
      </Form>
    );
  }

}


export default BudgetAdd;
