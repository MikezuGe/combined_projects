import React, { useState, useMemo, } from 'react';
import PropTypes from 'prop-types';

import { Field as InputField, } from 'components/molecules';


const initialMeta = {
  error: '',
  valid: false,
  showError: false,
};


/**
 * @param {Object} props
 * @param {string|bool|Date} props.initialValue
 * @param {func} props.onChange
 * @param {func|func[]} props.validate
 * @param {children} children
 */
const Field = ({ initialValue, onChange, validate: initialValidators, children, ...rest }) => {
  const [ value, setValue, ] = useState(initialValue);
  const [ meta, setMeta, ] = useState(initialMeta);

  const setMetaError = useMemo(() => error => setMeta(prevMeta => ({
    ...prevMeta,
    valid: !error,
    error,
    showError: prevMeta.showError && !!error,
  })), []);

  const validators = useMemo(
    () => initialValidators ?
      Array.isArray(initialValidators) ?
        initialValidators :
        [ initialValidators, ] :
      [],
    [ initialValidators, ]
  );

  const childProps = {
    addValidator: fn => validators.push(fn),
    removeValidator: fn => {
      const index = validators.indexOf(fn);
      index !== -1 && validators.splice(index);
    },
    setValue: value => setValue(value),
    getValue: () => value,
    getMeta: () => meta,
    validate: () => {
      const error = validators.reduce((error, validate) => error || validate(value), '');
      setMeta(prevMeta => ({
        ...prevMeta,
        valid: !error,
        error,
        showError: !!error,
      }));
      return !error;
    },
    reset: () => {
      setMeta({ ...initialMeta, });
      setValue(initialValue);
    },
  };

  return (
    <>
      {children(childProps)}
      <InputField
        {...rest}
        value={value}
        onChange={useMemo(() => onChange ?
          value => {
            const error = validators.reduce((error, validate) => error || validate(value), '');
            setValue(value);
            setMetaError(error);
            onChange(value);
          } :
          value => {
            const error = validators.reduce((error, validate) => error || validate(value), '');
            setValue(value);
            setMetaError(error);
          }, [ onChange, ]
        )}
        meta={meta}
      />
    </>
  );
};

Field.propTypes = {
  initialValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func,
  validate: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.func),
    PropTypes.func,
  ]),
  children: PropTypes.func.isRequired,
};


export default Field;

/**
 * @typedef fieldChildProps
 * @property {function} isValid - Returns true if field has a valid value
 */

/**
 * @callback children
 * @param {fieldChildProps} props
 */
