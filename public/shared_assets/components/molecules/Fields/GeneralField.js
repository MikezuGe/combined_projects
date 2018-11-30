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


const GeneralField = ({ name, label, meta: { error, showError, }, ...rest }) => (
  <Wrapper>
    {label && <Label htmlFor={name}>{label}</Label>}
    <StyledInput
      id={name}
      name={name}
      type={'number'}
      {...rest}
    />
    {error && showError && <Label htmlFor={name}>{error}</Label>}
  </Wrapper>
);


GeneralField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    showError: PropTypes.bool.isRequired,
  }),
};


export default GeneralField;
