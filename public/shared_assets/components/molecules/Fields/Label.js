import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledLabel = styled.label`
`;


const Label = ({ htmlFor, children, }) => (
  <StyledLabel
    htmlFor={htmlFor}
  >
    {children}
  </StyledLabel>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.string.isRequired,
};


export default Label;
