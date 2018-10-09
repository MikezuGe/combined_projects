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


const TextField = props => {
  const { name, type, value, placeholder, onChange, label, meta: { error, submitted, } } = props;
  return (
    <Wrapper>
      { label && <Label>{label}</Label> }
      { submitted && error && <Label>{error}</Label> }
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


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default TextField;
