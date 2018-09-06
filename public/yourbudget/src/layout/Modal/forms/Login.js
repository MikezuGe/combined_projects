import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.baseURL = `${window.location.origin}/api/graphql`;

import { addToast, } from 'layout';
import { Form, Field, } from 'components';


export const formType = 'LOGIN';


const ButtonWrapper = styled.div`
display: flex;`;


const SubmitField = styled(Field)`
flex: 1 1 50px;
`;


const validateEmail = email => {
  if (!email) {
    return 'Email not defined.';
  } else if (email.length < 5 || !/^[a-zåäöA-ZÅÄÖ.]+@\w+\.\w+$/.test(email)) {
    return 'Email invalid, not a proper email';
  }
  return '';
};


const validatePassword = password => {
  return '';
  if (!password) {
    return 'Password not defined.';
  } else if (password.length < 5) {
    return 'Password must be at least 5 characters long.';
  } else if (!/^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)(?=.*[@$!%*?&])[A-ZÅÄÖa-zåäö\d@$!%*?&]{5,}/.test(password)) {
    return (
      <ul style={{ listStyle: 'none', }}>
        {'Password invalid, must contain at least'}
        <li>{'One uppercase letter (A-ZÅÄÖ)'}</li>
        <li>{'One lowercase letter (a-zåäÖ)'}</li>
        <li>{'One number (0-9)'}</li>
        <li>{'One special characer (@$!%*?&)'}</li>
      </ul>
    );
  }
  return '';
};

const query = `mutation ($input: AuthInput!) {
  createAuth(input: $input) {
    sessionId
    user {
      username
    }
  }
}`;

const login = variables => new Promise((resolve, reject) => {
  axios.post('/', { query, variables, })
    .then(result => resolve(result))
    .catch(err => reject(err));
});


export default class BudgetAdd extends React.Component {

  onSubmit = input => new Promise(async resolve => {
    const result = await login({ input, });
    if (result.status === 200 && result.data.data.createAuth) {
      addToast(`You are not logged in as ${result.data.data.createAuth.user.username}`);
      return resolve(true);
    }
    resolve(false);
  });

  render () {
    return (
      <Form onSubmit={this.onSubmit} onClose={this.props.close}>
        <Field type='text' name={'email'} label={'Email'} validate={validateEmail} />
        <Field type='password' name={'password'} label={'Password'} validate={validatePassword} />
        <ButtonWrapper>
          <SubmitField type='submit' value={'Login'} submit close />
        </ButtonWrapper>
      </Form>
    );
  }

}


BudgetAdd.propTypes = {
  close: PropTypes.func.isRequired,
};
