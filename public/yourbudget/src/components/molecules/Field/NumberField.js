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
width: 100%;
`;


const TextField = props => {
  const { name, type, value, label, placeholder, onChange, meta: { error, submitted, }, ...rest } = props;
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
        {...rest}
      />
    </Wrapper>
  );
};


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};


export default TextField;
