import React from 'react';
import PropTypes from 'prop-types';


import firstLetterToUpperCase from 'js/utility/firstlettertouppercase';


import 'css/components/forms/datefield.css';
import 'css/components/forms/common.css';


const DateField = ({ name, value, onChange, meta: { submitted, pristine, changed, error, }, }) => <div className='form_field'>
  <label htmlFor={name} className='form_label'>{`${firstLetterToUpperCase(name)}:`}</label>
  <input name={name} id={name} className='form_input' type='date' value={value} onChange={onChange} />
  { (!changed && (submitted && error) || (submitted && pristine)) && <label htmlFor={name} className='form_error'>{error}</label> }
</div>;


DateField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};


export default DateField;
