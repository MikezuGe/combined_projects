import React from 'react';
import PropTypes from 'prop-types';

import { Form, } from '../../../../shared_assets/components/organisms';


const validateEmail = value => {
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
      }, {
        name: 'password',
        type: 'password',
        label: 'Password',
      },
    ]}
    buttons={[
      {
        name: 'register',
        text: 'Register',
        actions: [ 'submit', 'close', ],
      },
    ]}
  >
    {({ renderField, renderButton, }) => (
      <React.Fragment>
        {renderField('email')}
        {renderField('username')}
        {renderField('password')}
        {renderButton('register')}
      </React.Fragment>
    )}
  </Form>
);

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Register;
