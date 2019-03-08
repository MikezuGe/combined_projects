import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledLabel = styled.label`
${({ type, }) => type === 'error' ? `
color: red;
text-align: right;
` : `
color: default;
text-align: default;
`}
height: ${({ hide, }) => hide ? '0' : '100%'};
`;


const Label = ({ text, ...rest }) => (
  <StyledLabel {...rest}>
    {text}
  </StyledLabel>
);

Label.propTypes = {
  type: PropTypes.string,
  hide: PropTypes.bool,
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string,
};


export default Label;
