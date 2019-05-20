import React, { useMemo, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from './Select';


const validateNumberRegex = /^\d*(\.\d*)?$/;
const getValidatorByType = type => type === 'number' ?
  value => validateNumberRegex.test(value) :
  undefined;
// Add more validator types


const ToggleLabel = styled.label`
  background: white;
  border-radius: 0.6em;
  display: block;
  height: 1.2em;
  position: relative;
  width: 2.6em;
  &:after {
    background: blue;
    border-radius: 50%;
    content: '';
    display: block;
    height: 1em;
    left: ${({ checked, }) => checked ? 1.5 : 0.1}em;
    position: absolute;
    top: 0.1em;
    transition: left ease-in-out ${({ theme, }) => theme.animateNormal};
    width: 1em;
  }
`;


const StyledInput = styled(({ type, ...rest }) => {
  return type === 'select' ? (
    <Select {...rest} />
  ) : (
    <input
      {...rest}
      type={type === 'toggle' || type === 'checkbox' ?
        'checkbox' :
        type === 'radio' || type === 'password' || type === 'date' ?
          type : 'text'}
    />
  );
})`
  ${({ type, }) => type === 'toggle' ? `
  display: none;
  ` : `

  `}
`;


/**
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} props.name
 * @param {fieldTypes} props.type
 * @param {bool|string|Date} props.value
 * @param {string} [props.placeholder]
 * @param {onChange} props.onChange
 * @returns {JSX.Element}
 */
const Input = ({ id, name, type, value, onChange, ...rest }) => {
  const inputChange = useMemo(() => {
    const validate = getValidatorByType(type);
    return type === 'toggle' ?
      ({ target: { checked, }, }) => onChange(checked) :
      validate ?
        ({ target: { value, }, }) => validate(value) && onChange(value) :
        ({ target: { value, }, }) => onChange(value);
  }, [ type, onChange, ]);

  return (
    <>
      {type === 'toggle' && (
        <ToggleLabel
          htmlFor={id || name}
          checked={value}
        />
      )}
      <StyledInput
        {...rest}
        {...(type === 'toggle' ? { checked: value, } : { value, })}
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={inputChange}
      />
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};


export default Input;

/**
 * @typedef {'text'|'password'|'number'|'date'|'toggle'|'checkbox'|'radio'|'select'} fieldTypes
 */

/**
 * @callback onChange
 * @param {bool|string|Date} value
 */
