import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input, Label, } from 'components/atoms';


const Wrapper = styled.div`
  display: flex;
`;

const StyledLabel = styled(Label)`
${({ labelAfter, }) => !labelAfter && 'text-align: right'}
`;


const Field = ({ name, label, labelAfter, meta: { error, showError, }, ...rest }) => {
  const htmlFor = rest.id || name;
  return (
    <Wrapper>
      {label && !labelAfter && (
        <StyledLabel
          htmlFor={htmlFor}
          text={label}
          labelAfter={labelAfter}
        />
      )}
      <Input
        {...rest}
        name={name}
      />
      {label && labelAfter && (
        <StyledLabel
          htmlFor={htmlFor}
          text={label}
          labelAfter={labelAfter}
        />
      )}
      {showError && error && (
        <Label
          htmlFor={htmlFor}
          text={error}
        />
      )}
    </Wrapper>
  )
};

Field.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelAfter: PropTypes.bool,
  meta: PropTypes.shape({
    error: PropTypes.string,
    showError: PropTypes.bool.isRequired,
  }).isRequired,
};


export default Field;
