import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const Label = styled.label`

`;

const Input = styled.input`

`;


const PasswordField = props => {
  console.log(props);
  const { name, type, value, placeholder, onChange, label, meta: { error, } } = props;
  return (
    <Wrapper>
      { label && <Label>{label}</Label> }
      { error && <Label>{error}</Label> }
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
}


PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};


export default PasswordField;
