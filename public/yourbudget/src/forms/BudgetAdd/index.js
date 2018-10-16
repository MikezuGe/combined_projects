import React from 'react';
import styled from 'styled-components';

import { Form, addToast, } from '../../components/organisms';
import { Field, } from '../../components/molecules';
import query, { CREATE_FUND, } from '../../queries';



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
  } else if (!/^[0-9]*\.[0-9]{0,2}$/gi.test(t)) {
    return 'Must be defined as xxx,xx';
  }
};


class BudgetAdd extends React.Component {

  handleSubmit = async input => {
    const result = await query(CREATE_FUND, input);
    addToast(result.statusText);
    return result.status === 200;
  };

  render () {
    return (
      <Form onSubmit={this.handleSubmit} onClose={this.props.onClose}>
        <Field name='name' type='text' label='Name' placeholder='eg. Prisma Kokkola' validate={validateName} required />
        <Field name='amount' type='number' label='Amount' placeholder='xxx,xx' validate={validateAmount} min='0' step='0.01' required />
        <Field name='isIncome' type='checkbox' placeholder='xxx,xx' offValue={'Income'} onValue={'Expense'} toggle />
        <Field name='date' type='date' placeholder='date' required />
        <Button>Submit!</Button>
      </Form>
    );
  }

}


export default BudgetAdd;
