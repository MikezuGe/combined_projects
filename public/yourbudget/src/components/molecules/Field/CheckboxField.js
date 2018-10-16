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
`;

const Label = styled.label`

`;

const Input = styled.input`
`;


const CheckboxField = props => {
  const { name, type, toggle, offValue, onValue, checked, placeholder, onChange, label, ...rest } = props;
  return (
    <Wrapper>
      { label && <Label>{label}</Label> }
      { toggle
        ? (
          <InnerWrapper>
            { offValue && <Label>{offValue}</Label>}
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              checked={!!checked}
              onChange={onChange}
              {...rest}
            />
            { onValue && <Label>{onValue}</Label>}
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
  toggle: PropTypes.bool,
  checked: PropTypes.bool,
  onValue: PropTypes.string,
  offValue: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};


export default CheckboxField;
