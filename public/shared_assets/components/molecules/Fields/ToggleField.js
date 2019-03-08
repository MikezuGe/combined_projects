import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Label, } from '../../atoms';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const InnerWrapper = styled.div`
align-items: center;
display: flex;
justify-content: space-between;
`;

const StyledInput = styled.input`
display: ${({ hide, }) => hide ? 'none' : 'initial'};
`;

const ToggleLabel = styled(Label)`
background: white;
border-radius: 0.6em;
height: 1.2em;
position: relative;
width: 3em;
&:before {
  background: blue;
  border-radius: 0.5em;
  content: '';
  display: block;
  height: 1em;
  transition: transform ${({ theme, }) => theme.animateNormal};
  transform: translate(${({ checked, }) => checked ? 1.9 : 0.1}em, 0.1em);
  width: 1em;
}
`;


const ToggleField = ({ name, type, label, labelAfter, labelOff, labelOn, value, ...rest }) => (
  <Wrapper>
    {label && !labelAfter && (
      <Label
        type={'info'}
        htmlFor={name}
        text={label}
      />
    )}
    <InnerWrapper>
      {labelOff && (
        <Label
          type={'info'}
          htmlFor={name}
          text={labelOff}
        />
      )}
      <StyledInput
        id={name}
        {...rest}
        type={'checkbox'}
        checked={value}
        hide={type === 'toggle'}
      />
      {type === 'toggle' && (
        <ToggleLabel
          type={'info'}
          htmlFor={name}
          checked={value}
        />
      )}
      {labelOn && (
        <Label
          type={'info'}
          htmlFor={name}
          text={labelOn}
        />
      )}
    </InnerWrapper>
    {label && !!labelAfter && (
      <Label
        type={'info'}
        htmlFor={name}
        text={label}
      />
    )}
  </Wrapper>
);

ToggleField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelAfter: PropTypes.bool,
  labelOff: PropTypes.string,
  labelOn: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};


export default ToggleField;
