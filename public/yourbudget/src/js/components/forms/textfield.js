import React from 'react';
import PropTypes from 'prop-types';


import firstLetterToUpperCase from '../../utility/firstlettertouppercase';


import '../../../css/components/forms/textfield.css';
import '../../../css/components/forms/common.css';


const TextField = ({ name, value, placeholder, onChange, error, meta: { submitted, pristine, changed, }, }) => <div className='form_field'>
  <label htmlFor={name} className='form_label'>{`${firstLetterToUpperCase(name)}:`}</label>
  <input name={name} id={name} className='form_input' type='text' placeholder={placeholder} value={value} onChange={onChange} />
  { (!changed && (submitted && error) || (submitted && pristine)) && <label htmlFor={name} className='form_label form_error'>{error}</label> }
</div>;


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};


export default TextField;
