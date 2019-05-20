import React from 'react';

import { Form, } from 'components/organisms';


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
        name: 'test',
        type: 'select',
        label: 'Test',
        options: [
          {},
          { text: 'Test1', value: 'test1', group: '1', },
          { text: 'Test2', value: 'test2', group: '2', },
        ],
      }, {
        name: 'register',
        type: 'submit',
        title: 'Register',
        actions: [ 'submit', 'close', ],
      },
    ]}
  >
    {({ renderField, }) => (
      <div style={{ width: '500px', }}>
        {renderField('email')}
        {renderField('username')}
        {renderField('password')}
        {renderField('test')}
        {renderField('register')}
      </div>
    )}
  </Form>
);


export default Register;
