import React, { useRef, } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';


const getValidatorByType = type => {
  switch (type) {
  case 'number': return value => /^\d+\.\d+$/.test(value) || 'Must be a number';
  default: return undefined;
  }
};


const createValidator = (type, validate) => {
  const validateByType = getValidatorByType(type);
  return validateByType
    ? validate
      ? value => validateByType(value) && validate(value)
      : value => validateByType(value)
    : validate && (value => validate(value));
};


const Form = ({ fields, initialValues, children, onSubmit, onClose, }) => {
  const refs = fields
    .filter(({ type, }) => type !== 'submit')
    .reduce((total, { name, }) => ({ ...total, [name]: useRef(), }), {});

  const submit = async actions => {
    if (!actions.includes('submit')) {
      actions.includes('reset') && Object.values(refs).forEach(({ current, }) => current.reset());
      actions.includes('close') && onClose();
      return;
    }
    const _refs = Object.values(refs);
    const formIsValid = !_refs
      .map(({ current, }) => current.validateOnSubmit())
      .some(valid => !valid);
    if (!formIsValid) {
      return;
    }
    const keyValuePairs = _refs.reduce((total, { current, }) => {
      const { name, value, } = current.getFieldState();
      return { ...total, [name]: value, };
    }, {});
    if (await onSubmit(keyValuePairs)) {
      actions.includes('reset') && _refs.forEach(({ current, }) => current.reset());
      actions.includes('close') && onClose();
    }
  };

  const renderField = name => {
    const { validate, actions, ...fieldProps } = fields.find(field => field.name === name);
    if (!fieldProps) {
      throw new Error(`No field with name '${name}' found in fields`);
    }

    fieldProps.type === 'submit'
      ? (fieldProps.submit = () => submit(actions))
      : (fieldProps.validate = createValidator(fieldProps.type, validate));

    initialValues && initialValues.hasOwnProperty(name)
      && (fieldProps.initialValue = initialValues[name]);

    return (
      <Field
        {...fieldProps}
        key={name}
      >
        {handlers => (refs[name].current = handlers, undefined)}
      </Field>
    );
  };

  return children({ renderField, });
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    validate: PropTypes.func,
    initialValue: PropTypes.any,
    actions: PropTypes.arrayOf(PropTypes.string.isRequired),
  })).isRequired,
  initialValues: PropTypes.object,
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Form;
