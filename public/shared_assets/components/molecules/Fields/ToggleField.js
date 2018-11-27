import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from './Label';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const InnerWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const StyledInput = styled.input`
display: none;
`;

const ToggleLabel = styled.label`
position: relative;
border-radius: 0.6em;
width: 3em;
height: 1.2em;
background: white;
&:before {
  display: block;
  background: blue;
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  content: '';
  transition: transform 200ms;
  transform: translate(${({ checked, }) => checked ? 1.9 : 0.1}em, 0.1em);
}
`;


const ToggleField = ({ name, label, labelOff, labelOn, value, onFocus, onChange, meta: { error, }, ...rest }) => (
  <Wrapper>
    {label && <Label htmlFor={name}>{label}</Label>}
    <InnerWrapper>
      {labelOff && <Label htmlFor={name}>{labelOff}</Label>}
      <StyledInput
        id={name}
        name={name}
        type={'checkbox'}
        {...rest}
        onChange={onChange}
        onFocus={onFocus}
      />
      <ToggleLabel htmlFor={name} checked={value} />
      {labelOn && <Label htmlFor={name}>{labelOn}</Label>}
    </InnerWrapper>
    {error && <Label htmlFor={name}>{error}</Label>}
  </Wrapper>
);


ToggleField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
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


export default ToggleField;
