import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

const InnerWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const Label = styled.label`

`;

const ToggleLabel = styled.label`
position: relative;
border-radius: 0.6em;
width: 3em;
height: 1.2em;
background: white;
&:before {
  display: block;
  background: blue;
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  content: '';
  transition: transform 200ms;
  transform: translate(${({ checked, }) => checked ? 1.9 : 0.1}em, 0.1em);
}
`;

const Input = styled.input`
display: ${({ toggle, }) => toggle ? 'none' : 'block'};
`;


const CheckboxField = props => {
  const { name, type, checked, label, onValue, offValue, placeholder, toggle, onChange, ...rest } = props;
  return (
    <Wrapper>
      { label && <Label>{label}</Label> }
      { toggle
        ? (
          <InnerWrapper>
            { onValue && <Label htmlFor={name}>{onValue}</Label> }
            <Input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              checked={!!checked}
              onChange={onChange}
              toggle={toggle}
              {...rest}
            />
            <ToggleLabel htmlFor={name} checked={checked} />
            { offValue && <Label htmlFor={name}>{offValue}</Label> }
          </InnerWrapper>
        ) : (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          checked={!!checked}
          onChange={onChange}
          {...rest}
        />
      ) }
    </Wrapper>
  );
};


CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onValue: PropTypes.string,
  offValue: PropTypes.string,
  placeholder: PropTypes.string,
  toggle: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};


export default CheckboxField;
