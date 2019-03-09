import React, { useState, useImperativeHandle, forwardRef, } from 'react';
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


const Field = forwardRef(({ name, text, type, validate, initialValue, submit, ...rest }, ref) => {
  const [ value, setValue, ] = useState(parseInitialValueByType(type, initialValue));
  const [ meta, setMeta, ] = useState(initialMeta);

  useImperativeHandle(ref, () => ({
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
    getFieldState: () => ({
      name,
      value: parseFieldValueByType(type, value),
    }),
  }));

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
    type === 'checkbox' || type === 'toggle'
      ? <ToggleField {...fieldProps} />
      : <GeneralField {...fieldProps} />
  );
});

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
};


export default Field;
