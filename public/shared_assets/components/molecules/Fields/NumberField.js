import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from './Label';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const StyledInput = styled.input`
`;


const NumberField = ({ name, label, onFocus, onChange, meta: { error, }, ...rest }) => (
  <Wrapper>
    {label && <Label htmlFor={name}>{label}</Label>}
    <StyledInput
      id={name}
      name={name}
      type={'number'}
      {...rest}
      onChange={onChange}
      onFocus={onFocus}
    />
    {error && <Label htmlFor={name}>{error}</Label>}
  </Wrapper>
);


NumberField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  meta: PropTypes.shape({
    error: PropTypes.string,
    valid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
    changed: PropTypes.bool,
  }),
};


export default NumberField;
