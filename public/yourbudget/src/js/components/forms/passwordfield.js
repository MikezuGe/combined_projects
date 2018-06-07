import React from 'react';
import PropTypes from 'prop-types';


import firstLetterToUpperCase from 'js/utility/firstlettertouppercase';


import 'css/components/forms/passwordfield.css';
import 'css/components/forms/common.css';


const PasswordField = ({ name, value, placeholder, onChange, meta: { submitted, pristine, changed, error, }, }) => <div className='form_field'>
  <label htmlFor={name} className='form_label'>{`${firstLetterToUpperCase(name)}:`}</label>
  <input name={name} id={name} className='form_input' type='password' placeholder={placeholder} value={value} onChange={onChange} />
  { (!changed && (submitted && error) || (submitted && pristine)) && <label htmlFor={name} className='form_label form_error'>{error}</label> }
</div>;


PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};


export default PasswordField;
