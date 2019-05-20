import React, { useRef, } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import SubmitButton from './SubmitButton';



/**
 * @param {Object} props
 * @param {onSubmit} props.onSubmit - Asynchronous, called whenever a field with type 'submit' and action 'submit' is clicked
 * @param {func} [props.onClose] - Called whenever a field with type 'submit' and action 'close' is clicked
 * @param {func} [props.onReset] - Called whenever a field with type 'submit' and action 'reset' is clicked
 * @param {Object} [props.initialValues] - Key value pair of initial values
 * @param {field[]} props.fields - Array of field objects
 * @param {children} props.children - Callback function, whose parameter provides form controlling functions
 */
const Form = ({ onSubmit, onClose, onReset, initialValues, fields, children, }) => {
  const refs = fields
    .filter(field => field.type !== 'submit')
    .reduce((total, { name, }) => ({ ...total, [name]: useRef(), }), {});
  
  const renderField = name => {
    const field = fields.find(field => field.name === name);
    if (field.type !== 'submit') {
      !field.initialValue && (field.initialValue = initialValues[name] || '');
      return (
        <Field {...field}>
          {field => (refs[name].current = field, undefined)}
        </Field>
      );
    }
    const { actions, ...props } = field;
    props.onClick = async () => {
      const fieldRefs = Object.entries(refs).map(([ key, { current, }, ]) => ({ key, current, }));
      if (!actions.includes('submit')) {
        if (actions.includes('close')) {
          onClose && onClose()
        } else if (actions.includes('reset')) {
          onReset && (fieldRefs.forEach(field => field.current.reset()), onReset());
        }
        return;
      }
      // Form meta setting 'submitted'
      const valid = fieldRefs.reduce((valid, field) => valid ? field.current.validate() : (field.current.validate(), false), true);
      if (!valid) {
        return;
      }
      const data = fieldRefs.reduce((total, { key, current, }) => ({ ...total, [key]: current.getValue(), }), {});
      if (await onSubmit(data)) {
        if (actions.includes('close')) {
          onClose && onClose()
        } else if (actions.includes('reset')) {
          onReset && (fieldRefs.forEach(field => field.current.reset()), onReset());
        }
      }
    };
    return (
      <SubmitButton {...props} />
    );
  };

  return (
    children({ renderField, })
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  initialValues: PropTypes.object,
  fields: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};

Form.defaultProps = {
  initialValues: {},
};


export default Form;


/**
 * @callback onSubmit
 * @async
 * @param {Object} data - Key value pairs where key is the name of a field and value is the value of that field
 */

/**
 * @typedef {'text'|'password'|'number'|'date'|'toggle'|'checkbox'|'radio'|'select'|'submit'} fieldTypes
 */

/**
 * @callback onChange
 * @param {string|bool|Date} value - Field value
 */

/**
 * @callback validate
 * @param {string|bool|Date} value - Field value to validate
 * @returns {string|undefined} - Error string, or a falsy value if no errors
 */

/**
 * @typedef option
 * @property {string} text - Text displayed in the option
 * @property {string} value - Value of the option
 * @property {string} group - Group name the option belongs to. Groups can be shown/hidden
 */

/**
 * @typedef field
 * @property {string} name - Name of a field
 * @property {fieldTypes} [type=text] - Type of a field
 * @property {string} [label] - Displayed title of the field
 * @property {string} [placeholder] - Value displayed in the field, when there is no value
 * @property {string|bool|Date} [initialValue] - Value of a field, after form has been initialized
 * @property {onChange} onChange - Function that is called whenever field's value changes
 * @property {validate|validate[]} [validate] - Function, or an array of functions, which validates if user inputs correct values
 * @property {bool} [labelAfter] - If true, places label (title) after the input. Normally label is displayed before the input
 * @property {option[]} [options] - Selectable options, required for fields with type 'select' and 'radio'
 */

/**
 * @callback renderField
 * @param {string} name - Name of the field to render
 * @returns {JSX.Element} - The field as JSX element
 */

/**
 * @typedef formChildProps
 * @property {renderField} renderField
 */

/**
 * @callback children
 * @param {formChildProps} props
 */
