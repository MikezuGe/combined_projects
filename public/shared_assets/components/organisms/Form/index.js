import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Field from './Field';


const StyledForm = styled.form`
background: lime;
padding: 1em;
border-radius: 0.5em;
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
    const { fields, } = this.state;
    const valid = !fields.some(({ valid, }) => !valid);
    this.setState({
      pristine: false,
      submitting: valid,
      valid,
    }, async () => {
      if (!valid) {
        return;
      }
      const input = fields.reduce((total, { name, value, }) => (
        total[name] = value, total
      ), {})
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
    const field = this.state.fields.find(field => field.name === name);
    field.onChange = this.onChange
    return <Field {...field} />;
  }

  renderButton = name => {
    const button = this.props.buttons.find(button => button.name === name);
    button.type = 'submit';
    button.onClick = this.submit;
    return <Field {...button} />;
  }

  render () {
    return (
      <StyledForm>
        {this.props.children({
          renderField: this.renderField,
          renderButton: this.renderButton,
        })}
      </StyledForm>
    );
  }

}
