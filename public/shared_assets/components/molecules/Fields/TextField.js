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


const TextField = ({ name, label, meta: { error, touched, focused, }, ...rest }) => (
  <Wrapper>
    {label && <Label htmlFor={name}>{label}</Label>}
    <StyledInput
      id={name}
      name={name}
      type={'text'}
      {...rest}
    />
    {error && touched && !focused && <Label htmlFor={name}>{error}</Label>}
  </Wrapper>
);


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    focused: PropTypes.bool,
  }),
};


export default TextField;
