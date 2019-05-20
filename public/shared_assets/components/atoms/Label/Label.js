import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledLabel = styled.label`
`;


/**
 * @param {Object} props
 * @param {string} props.htmlFor - Id of input label refers to
 * @param {string} props.text
 */
const Label = ({ htmlFor, text, ...rest }) => {
  return (
    <StyledLabel
      {...rest}
      htmlFor={htmlFor}
    >
      {text}
    </StyledLabel>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string,
};


export default Label;
