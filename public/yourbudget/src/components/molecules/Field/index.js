import React from 'react';
import PropTypes from 'prop-types';

import { default as TextField, } from './TextField';
import { default as PasswordField, } from './PasswordField';
import { default as NumberField, } from './NumberField';
import { default as DateField, } from './DateField';
import { default as CheckboxField, } from './CheckboxField';


class Field extends React.Component {
  
  handleChange = ({ target: { name, value, checked, }, }) => {
    const { meta, validate, } = this.props;
    if (meta) {
      meta.pristine = false;
      meta.changed = true;
      meta.touched = true;
      if (validate) {
        meta.error = validate(value);
        meta.valid = !meta.error;
      }
    }
    this.props.onChange({
      name,
      value,
      checked,
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
        { type === 'date' && <DateField {...this.props} onChange={this.handleChange} /> }
        { type === 'checkbox' && <CheckboxField {...this.props} onChange={this.handleChange} /> }
      </React.Fragment>
    );
  }

}


Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};


export default Field;
