import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Field from './Field';


const StyledForm = styled.form`
background: lime;
padding: 1em;
`;


export default class Form extends React.Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    submitting: false,
    pristine: true,
    valid: false,
    fields: this.props.fields.reduce((total, field) => {
      if (field.type === 'submit') {
        return total;
      }
      const { name, } = field;
      field.value = this.props.initialValues && this.props.initialValues[name] || '';
      field.valid = field.validate(field.value)
      total[name] = field;
      return total;
    }, {}),
  }

  reset = () => this.setState({
    submitting: false,
    pristine: true,
    valid: false,
    fields: this.props.fields.reduce((total, field) => {
      if (field.type === 'submit') {
        return total;
      }
      const { name, } = field;
      field.value = this.props.initialValues && this.props.initialValues[name] || '';
      field.valid = field.validate(field.value)
      total[name] = field;
      return total;
    }, {}),
  })
  
  submit = e => {
    e.preventDefault();
    const valid = !Object.values(this.state.fields).some(({ valid, }) => !valid);
    this.setState({
      submitting: valid,
      valid,
    }, () => {
      if (valid) {
        const result = this.props.onSubmit(
          Object.values(this.state.fields)
            .reduce((total, { name, value, }) => {
              total[name] = value;
              return total;
            }, {})
        );
        console.log(result); // eslint-disable-line
      }
    });
  }

  onChange = ({ name, value, valid, }) => {
    this.setState(({ fields, }) => {
      fields = {
        ...fields,
        [name]: {
          ...fields[name],
          value,
          valid,
        },
      };
      return {
        fields,
        pristine: false,
        valid: !Object.values(fields).some(({ valid, }) => !valid),
      };
    });
  }

  renderField = name => (
    <Field
      {...this.state.fields[name]}
      onChange={this.onChange}
    />
  );

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
