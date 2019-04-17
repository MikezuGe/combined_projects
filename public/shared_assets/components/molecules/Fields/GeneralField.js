import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Label, } from '../../atoms';


const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

const StyledInput = styled(props => <input {...props} />)`
`;


const GeneralField = ({ name, type, label, labelAfter, meta, ...rest }) => {
  const { showErrors, error, } = meta;
  return (
    <Wrapper>
      {label && !labelAfter && (
        <Label
          type={'info'}
          htmlFor={name}
          text={label}
        />
      )}
      <StyledInput
        id={name}
        type={type === 'number' ? 'text' : type}
        {...rest}
      />
      {label && !!labelAfter && (
        <Label
          type={'info'}
          htmlFor={name}
          text={label}
        />
      )}
      <Label
        hide={!showErrors || !error}
        type={'error'}
        htmlFor={name}
        text={error}
      />
    </Wrapper>
  );
};

GeneralField.defaultProps = {
  meta: {},
};

GeneralField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelAfter: PropTypes.bool,
  actions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  meta: PropTypes.shape({
    submitted: PropTypes.bool,
    showErrors: PropTypes.bool,
    error: PropTypes.string,
  }),
};


export default GeneralField;
