import React from 'react';
import PropTypes from 'prop-types';


import '../../../css/components/forms/toggleswitchfield.css';
import '../../../css/components/forms/common.css';


const ToggleSwitchField = ({ name, value, onValue, offValue, onChange, }) => <div className='form_field switch'>
  <label htmlFor={name} className='form_label switch_label'>{offValue}</label>
  <input name={name} id={name} className='form_input hidden' type='checkbox' onChange={onChange} defaultChecked={value} />
  <label htmlFor={name} className='switch_toggle' />
  <label htmlFor={name} className='form_label switch_label'>{onValue}</label>
</div>;


ToggleSwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onValue: PropTypes.string.isRequired,
  offValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default ToggleSwitchField
