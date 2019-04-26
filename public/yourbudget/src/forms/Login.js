import React from 'react';
import PropTypes from 'prop-types';

import { Form, } from 'components/organisms';


const validateUsername = username => {
  if (!username) {
    return 'Required';
  }
};

const validatePassword = password => {
  if (!password) {
    return 'Required';
  }
};


const Login = props => (
  <Form
    {...props}
    fields={[
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        validate: validateUsername,
      }, {
        name: 'password',
        type: 'text',
        label: 'Password',
        validate: validatePassword,
      }, {
        name: 'login',
        type: 'submit',
        text: 'Login',
        actions: [ 'submit', 'close', ],
      },
    ]}
  >
    {({ renderField, }) => (
      <div style={{ width: '500px', }}>
        {renderField('username')}
        {renderField('password')}
        {renderField('login')}
      </div>
    )}
  </Form>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};


export default Login;
