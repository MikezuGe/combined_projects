import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import Form, { Field, } from 'js/components/forms';
import { login, } from 'js/redux';


class Login extends Component {

  validateUsername (username) {
    if (username.length < 4) {
      return 'Username must be at least 4 characters long.';
    } else if (/[^a-zåäö0-9]/gi.test(username)) {
      return 'Username can contain a-zå ä ö 0-9';
    }
  }

  validatePassword (password) {
    if (username.length < 6) {
      return 'Password must be at least 4 characters long.';
    }
  }

  submit (data) {
    login(data);
  }

  render () {
    return (
      <Form submit={this.submit}>
        { Field({ type: 'text', name: 'username', initialValue: '', placeholder: 'Username', validate: this.validateUsername, }) }
        { Field({ type: 'password', name: 'password', initialValue: '', placeholder: 'Password', validate: this.validatePassword, }) }
      </Form>
    );
  }

}


const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});


export default connect(null, mapDispatchToProps)(Login);
