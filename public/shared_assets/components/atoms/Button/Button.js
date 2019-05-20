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


const Button = ({ title, type, ...rest }) => (
  <StyledButton
    {...rest}
    type={type}
  >
    {title}
  </StyledButton>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};


export default Button;
