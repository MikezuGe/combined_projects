import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'


const Wrapper = styled.div`
display: flex;
flex-direction: column;`;


const Label = styled.label`
`;


const Input = styled.input`
`;


const Textfield = ({ name, label, }) => <Wrapper>
{ label &&
  <Label name={name} htmlFor={name}>{label}</Label> }
<Input id={name} type={'text'}></Input>
</Wrapper>;


Textfield.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};


export default Textfield;
