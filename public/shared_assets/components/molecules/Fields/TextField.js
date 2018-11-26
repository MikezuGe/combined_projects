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


const TextField = ({ name, label, onFocus, onChange, meta: { error, }, ...rest }) => (
  <Wrapper>
    {label && <Label htmlFor={name}>{label}</Label>}
    <StyledInput
      id={name}
      name={name}
      type={'text'}
      {...rest}
      onChange={onChange}
      onFocus={onFocus}
    />
    {error && <Label htmlFor={name}>{error}</Label>}
  </Wrapper>
);


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  meta: PropTypes.objectOf(
    PropTypes.shape({
      error: PropTypes.string,
    })
  ),
};


export default TextField;
