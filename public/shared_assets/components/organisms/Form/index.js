import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Field from './Field';


const StyledForm = styled.form`
background: lime;
padding: 1em;
`;


const resetForm = ({ fields, initialValues, }) => ({
  submitting: false,
  pristine: true,
  valid: false,
  fields: fields.filter(({ type, }) => type !== 'submit')
    .map(field => {
      const initialValue = (initialValues && initialValues[field.name]) || field.initialValue;
      initialValue && (field.initialValue = initialValue);
      field.value = field.initialValue || (field.type === 'toggle' || field.type === 'checkbox' ? false : '');
      field.valid = !field.validate || !field.validate(field.value);
      return field;
    }, {}),
  submitFields: fields.filter(({ type, }) => type === 'submit'),
});


export default class Form extends React.Component {

  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = resetForm(this.props)

  reset = () => this.setState(resetForm(this.props))
  
  submit = e => {
    e.preventDefault();
    const close = e.target.getAttribute('close');
    const submit = e.target.getAttribute('submit');
    const reset = e.target.getAttribute('reset');
    if (!submit) {
      return close
        ? this.props.onClose()
        : reset
          ? this.reset()
          : null;
    }
    const valid = !this.state.fields.some(({ type, valid, }) => type === 'submit' && !valid);
    console.log(valid);
    this.setState({
      pristine: false,
      submitting: valid,
      valid,
    }, async () => {
      if (!valid) {
        console.log('Not valid');
        return;
      }
      const input = this.state.fields.reduce((total, { name, type, value, }) => {
        type !== 'submit' && (total[name] = value);
        return total;
      }, {})
      const success = await this.props.onSubmit(input);
      if (success) {
        close
          ? this.props.onClose()
          : reset
            ? this.reset()
            : this.setState({ submitting: false, });
      }
    });
  }

  onChange = ({ name, value, valid, }) => {
    this.setState(({ fields, }) => {
      const index = fields.findIndex(field => field.name === name);
      fields[index] = {
        ...fields[index],
        value,
        valid,
      };
      return {
        fields,
        pristine: false,
        valid: !fields.some(({ valid, }) => !valid),
      };
    });
  }

  renderField = name => {
    const field = this.state.fields.find(field => field.name === name)
      || this.state.submitFields.find(field => field.name === name);
    const { type, } = field;
    if (type === 'submit') {
      field.onClick = this.submit
    } else {
      field.onChange = this.onChange
    }
    return <Field {...field} />;
  }

  render () {
    return (
      <StyledForm>
        {this.props.children({
          renderField: this.renderField,
          submit: this.submit,
          reset: this.reset,
          submitting: this.state.submitting,
          pristine: this.state.pristine,
          valid: this.state.valid,
        })}
      </StyledForm>
    );
  }

}
