import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import './common.css';
import './ToggleswitchField.css';


class ToggleswitchField extends Component {

  onChange = e => {
    this.props.onChange(this.props.name, e.target.checked);
  }

  render () {
    const { props: { name, value, onValue, offValue, }, onChange, } = this;
    return (
      <div className='form_field switch'>
        <label htmlFor={name} className='form_label switch_label'>{offValue}</label>
        <input id={name} className='form_input switch_toggle_checkbox hidden' type='checkbox' onChange={onChange} defaultChecked={value} />
        <label htmlFor={name} className='form_label switch_toggle' />
        <label htmlFor={name} className='form_label switch_label'>{onValue}</label>
      </div>
    );
  }

}


ToggleswitchField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValue: PropTypes.string.isRequired,
  offValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default ToggleswitchField
