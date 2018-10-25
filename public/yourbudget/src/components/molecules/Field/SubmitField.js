import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const b =  ({ value, onClick, ...rest }) => (
  <button
    {...rest}
    onClick={onClick}
  >
    {value || 'Submit'}
  </button>
);


const StyledButton = styled(b)`
`;


const SubmitField = ({ submit, reset, close, ...rest }) => {
  const clickActions = {};
  submit && (clickActions.submit = 'true');
  reset && (clickActions.reset = 'true');
  close && (clickActions.close = 'true');
  return <StyledButton {...clickActions} {...rest} />
};


SubmitField.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default SubmitField;
