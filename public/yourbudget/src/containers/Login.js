import React, { Component, } from 'react';
import { connect, } from 'react-redux';

import Form, { Field, } from 'components/form';
import { login, } from 'stores/';


class Login extends Component {

  validateUsername (username) {
    if (!username) {
      return 'Username unspecified.';
    } else if (username.length < 4) {
      return 'Username must be at least 4 characters long.';
    } else if (/[^a-zåäö0-9]/gi.test(username)) {
      return 'Username can contain a-zå ä ö 0-9';
    }
  }

  validatePassword (password) {
    if (!password) {
      return 'Password unspecified.';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
  }

  onSubmit = data => {
    // eslint-disable-next-line
    console.log('submitted', data);
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.onSubmit} >
          <Field name='text' type='text' validate={this.validateUsername} />
          <Field name='password' type='password' validate={this.validatePassword} />
          <Field name='submit' type='submit' value='Login' />
        </Form>
      </div>
    );
  }

}


const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});


export default connect(null, mapDispatchToProps)(Login);
