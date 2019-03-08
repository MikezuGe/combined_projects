import React, { useRef, } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';


const Form = ({ fields, initialValues, children, onSubmit, onClose, }) => {
  const refs = fields
    .filter(({ type, }) => type !== 'submit')
    .reduce((total, { name, }) => ({ ...total, [name]: useRef(), }), {});

  const submit = async ({ target, }) => {
    const submit = !!target.getAttribute('submit');
    const reset = !!target.getAttribute('reset');
    const close = !!target.getAttribute('close');
    if (!submit) {
      reset && Object.values(refs).forEach(({ current, }) => current.reset());
      close && onClose();
      return;
    }
    const _refs = Object.values(refs);
    const formIsValid = !_refs
      .map(({ current, }) => current.validateOnSubmit())
      .some(valid => !valid);
    if (!formIsValid) {
      return;
    }
    const fieldStates = _refs.reduce((total, { current, }) => {
      const { name, value, } = current.getFieldState();
      return { ...total, [name]: value, };
    }, {});
    if (await onSubmit(fieldStates)) {
      reset && _refs.forEach(({ current, }) => current.reset());
      close && onClose();
    }
  };

  const renderField = name => {
    const fieldProps = fields.find(field => field.name === name);
    if (!fieldProps) {
      throw new Error(`No field with name '${name}' found in fields`);
    }
    fieldProps.type === 'submit' && (fieldProps.submit = submit);
    initialValues && initialValues.hasOwnProperty(name)
      && (fieldProps.initialValue = initialValues[name]);
    return (
      <Field
        {...fieldProps}
        key={name}
        ref={fieldProps.type !== 'submit' ? ref => (refs[name].current = ref) : undefined}
      />
    );
  };

  return children({ renderField, });
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    initialValue: PropTypes.any,
  })).isRequired,
  initialValues: PropTypes.object,
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Form;
