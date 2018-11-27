import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const StyledButton = styled(props => <button {...props} />)`
`;


const SubmitField = ({ name, text, actions, onClick, ...rest }) => (
  <Wrapper>
    <StyledButton
      id={name}
      name={name}
      type={'submit'}
      onClick={onClick}
      {...actions.reduce((total, action) => {
        total[action] = 'true';
        return total;
      }, {})}
      {...rest}
    >
      {text}
    </StyledButton>
  </Wrapper>
);


SubmitField.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.oneOf([
      'submit',
      'reset',
      'close',
    ])
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};


export default SubmitField;
