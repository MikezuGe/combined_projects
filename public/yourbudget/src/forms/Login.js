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
      },
    ]}
    buttons={[
      {
        name: 'login',
        text: 'Login',
        actions: [ 'submit', 'close', ],
      },
    ]}
  >
    {({ renderField, renderButton, }) => (
      <React.Fragment>
        {renderField('username')}
        {renderField('password')}
        {renderButton('login')}
      </React.Fragment>
    )}
  </Form>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Login;
