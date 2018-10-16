import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;

import { Form, } from '../../organisms';
import { Field, } from '../../molecules';


const query = `mutation createFund ($input: FundInput!) {
  createFund(input: $input) {
    id,
    name,
    amount,
    isIncome,
    date
  }
}`;


const createFund = input => new Promise((resolve, reject) => {
  const variables = {
    input: {
      ...input,
      amount: parseFloat(input.amount),
      date: new Date().toISOString(),
    },
  };
  return axios({
    url: '/',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    data: JSON.stringify({ query, variables, }),
  })
    .then(val => resolve(val.data.data.funds))
    .catch(err => reject(err));
});


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
};


class BudgetAdd extends React.Component {

  handleSubmit = async fields => await createFund(fields);

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Field name='name' type='text' label='Name' placeholder='eg. Prisma Kokkola' validate={validateName} required />
        <Field name='amount' type='text' label='Amount' placeholder='xxx,xx' validate={validateAmount} required />
        <Field name='isIncome' type='checkbox' placeholder='xxx,xx' offValue={'Income'} onValue={'Expense'} toggle required />
        <Button>Submit!</Button>
      </Form>
    );
  }

}


export default BudgetAdd;
