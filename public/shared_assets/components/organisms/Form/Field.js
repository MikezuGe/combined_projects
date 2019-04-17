import React, { useState, } from 'react';
import PropTypes from 'prop-types';

import {
  GeneralField,
  ToggleField,
} from '../../molecules';
import { parseDate, } from '../../utility';


const initialMeta = {
  submitted: false,
  showErrors: false,
  valid: false,
  error: undefined,
};


const parseInitialValueByType = (type, value) => (
  type === 'date'
    ? parseDate(value, 'YYYY-MM-DD')
    : value || (type === 'checkbox' || type === 'toggle'
      ? false
      : '')
);

const parseFieldValueByType = (type, value) => (
  type === 'number'
    ? parseFloat(value)
    : type === 'date'
      ? new Date(value)
      : value
);


const Field = ({ name, text, type, validate, initialValue, submit, children, ...rest }) => {
  const [ value, setValue, ] = useState(parseInitialValueByType(type, initialValue));
  const [ meta, setMeta, ] = useState(initialMeta);

  const onChange = e => {
    const value = !e
      ? value
      : type === 'checkbox' || type === 'toggle'
        ? e.target.checked
        : e.target.value;
    const error = validate ? validate(value) : undefined;
    setValue(value);
    setMeta(prevMeta => ({
      ...prevMeta,
      showErrors: prevMeta.submitted && !!error,
      valid: !error,
      error,
    }));
  };

  const fieldProps = {
    ...rest,
    name,
    type,
    ...(submit
      ? {
        onClick: submit,
        value: text,
      }
      : {
        meta,
        value,
        onChange,
      }
    ),
  };

  return (
    <React.Fragment>
      {type !== 'submit' && children({
        getFieldState: () => ({
          name,
          value: parseFieldValueByType(type, value),
        }),
        validateOnSubmit: () => {
          const error = validate ? validate(value) : undefined;
          const valid = !error;
          setMeta(prevMeta => ({
            ...prevMeta,
            submitted: true,
            showErrors: !valid,
            valid,
            error,
          }));
          return valid;
        },
        reset: () => {
          setValue(parseInitialValueByType(type, initialValue));
          setMeta(initialMeta);
        },
      })}
      {type === 'checkbox' || type === 'toggle'
        ? <ToggleField {...fieldProps} />
        : <GeneralField {...fieldProps} />}
    </React.Fragment>
  );
};

Field.defaultProps = {
  initialValue: '',
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  initialValue: PropTypes.any,
  validate: PropTypes.func,
  submit: PropTypes.func,
  children: PropTypes.func.isRequired,
};


export default Field;
