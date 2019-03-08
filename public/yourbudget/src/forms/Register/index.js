import React from 'react';

import { Form, } from '../../../../shared_assets/components/organisms';


const validateEmail = value => {
  if (!value) {
    return 'Required';
  }
};

const validateUsername = value => {
  if (!value) {
    return 'Required';
  }
};

const validatePassword = value => {
  if (!value) {
    return 'Required';
  }
};


const Register = props => (
  <Form
    {...props}
    fields={[
      {
        name: 'email',
        type: 'text',
        label: 'Email',
        validate: validateEmail,
      }, {
        name: 'username',
        type: 'text',
        label: 'Username',
        validate: validateUsername,
      }, {
        name: 'password',
        type: 'password',
        label: 'Password',
        validate: validatePassword,
      }, {
        name: 'register',
        type: 'submit',
        text: 'Register',
        actions: [ 'submit', 'close', ],
      },
    ]}
  >
    {({ renderField, }) => (
      <div style={{ width: '500px', }}>
        {renderField('email')}
        {renderField('username')}
        {renderField('password')}
        {renderField('register')}
      </div>
    )}
  </Form>
);


export default Register;
