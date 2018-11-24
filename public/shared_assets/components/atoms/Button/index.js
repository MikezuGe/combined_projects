import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledButton = styled.button`
`;


const Button = ({ title, type, }) => (
  <StyledButton type={type}>
    {title}
  </StyledButton>
);


Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};


export default Button;
