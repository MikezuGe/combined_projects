import React from 'react';
import PropTypes from 'prop-types';

import { Form, } from 'components/organisms';


const Login = props => (
  <Form
    {...props}
    fields={[
      {
        name: 'username',
        type: 'text',
        label: 'Username',
      }, {
        name: 'password',
        type: 'text',
        label: 'Password',
      }, {
        name: 'login',
        type: 'submit',
        text: 'Login',
        actions: [ 'submit', 'close', ],
      },
    ]}
  >
    {({ renderField, }) => (
      <>
        {renderField('username')}
        {renderField('password')}
        {renderField('login')}
      </>
    )}
  </Form>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Login;
