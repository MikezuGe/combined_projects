import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledButton = styled.button`
background: ${({ type, }) => type === 'danger' ? '#B50' : '#05B'};
border: none;
border-radius: 0.5em;
color: white;
min-height: 2em;
min-width: 6em;
padding: 0.5em;
`;

/**
 * @param {object} props
 * @param {string} props.label - Text displayed in the button
 * @param {'success'|'warning'|'danger'} [props.type=success] - Determines button style
 * @param {func} props.onClick - Self explanatory
 */
const Button = ({ label, type, ...rest }) => (
  <StyledButton
    {...rest}
    type={type}
  >
    {label}
  </StyledButton>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};


export default Button;
