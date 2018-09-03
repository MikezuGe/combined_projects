import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'


const Wrapper = styled.div`
display: flex;
flex-direction: column;`;


const Label = styled.label`
`;


const ErrorLabel = styled(Label)`
color: red;`;


const Input = styled.input`
`;


const Textfield = ({ name, label, onChange, meta: { submitted, valid, error, }, }) => (
  <Wrapper>
    { label &&
      <Label htmlFor={name}>{label}</Label> }
    { submitted && !valid &&
      <ErrorLabel htmlFor={name}>{error}</ErrorLabel> }
    <Input
      id={name}
      name={name}
      type='number'
      onChange={onChange}
    />
  </Wrapper>
);


Textfield.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};


export default Textfield;
