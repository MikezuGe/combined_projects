import React from 'react';
import PropTypes from 'prop-types';

import { default as TextField, } from './TextField';
import { default as PasswordField, } from './PasswordField';
import { default as NumberField, } from './NumberField';


class Field extends React.Component {
  
  handleChange = ({ target: { name, type, value, checked, }, }) => {
    const { meta, validate, } = this.props;
    meta.pristine = false;
    meta.changed = true;
    meta.touched = true;
    if (validate) {
      meta.error = validate(value);
      meta.valid = !meta.error;
    }
    type === 'checkbox' && (value = checked === 'on');
    this.props.onChange({
      name,
      value,
      meta,
    });
  }

  render () {
    const { type, } = this.props;
    return (
      <React.Fragment>
        { type === 'text' && <TextField {...this.props} onChange={this.handleChange} /> }
        { type === 'password' && <PasswordField {...this.props} onChange={this.handleChange} /> }
        { type === 'number' && <NumberField {...this.props} onChange={this.handleChange} /> }
      </React.Fragment>
    );
  }

}


Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};


export default Field;
