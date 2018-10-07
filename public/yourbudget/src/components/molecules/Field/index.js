import React from 'react';
import PropTypes from 'prop-types';

import { default as TextField, } from './TextField';
import { default as PasswordField, } from './PasswordField';


class Field extends React.Component {
  
  handleChange = ({ target: { name, type, value, checked, }, }) => {
    type === 'checkbox' && (value = checked === 'on');
    this.props.onChange({
      name,
      value,
    });
  }

  render () {
    const { type, } = this.props;
    return (
      <React.Fragment>
        { type === 'text' && <TextField {...this.props} onChange={this.handleChange} /> }
        { type === 'password' && <PasswordField {...this.props} onChange={this.handleChange} /> }
      </React.Fragment>
    );
  }

}


Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
};


export default Field;
