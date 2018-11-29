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
});


export default class Form extends React.Component {

  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = resetForm(this.props)

  fieldRefs = []

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
    const fieldStates = this.fieldRefs.map(({ props, state, }) => ({
      name: props.name,
      value: state.value,
      error: state.meta.error,
    }));
    const valid = !fieldStates.some(({ error, }) => !!error);
    this.setState({
      pristine: false,
      submitting: valid,
      valid,
    }, async () => {
      if (!valid) {
        return;
      }
      const input = fieldStates.reduce((total, { name, value, }) => (
        total[name] = value, total
      ), {});
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

  renderField = name => {
    const { fields, } = this.props;
    const field = fields.find(field => field.name === name);
    field.ref = ref => fields.length !== this.fieldRefs.length && (this.fieldRefs.push(ref));
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
        {console.log(this.fieldRefs)}
      </StyledForm>
    );
  }

}
