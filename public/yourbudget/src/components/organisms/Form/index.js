import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledForm = styled.form`
background: red;
padding: 1em;
`;


const meta = {
  error: '',
  valid: false,
  pristine: true,
  touched: false,
  changed: false,
  submitted: false,
};


const fieldsToState = (total, current) => {
  if (!React.isValidElement(current)) return total;
  const { children, } = current.props;
  children && React.Children.map(children, child => fieldsToState(total, child));
  const { name, value, checked, } = current.props;
  if (name) {
    total[name] = {
      ...current.props,
      value: value || '',
      checked: !!checked,
      meta: {
        ...meta,
      },
    };
  }
  return total;
};


class Form extends React.Component {
  
  state = {
    ...this.props.children.reduce(fieldsToState, {}),
  }

  handleChange = ({ name, value, checked, meta, }) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
        checked,
        meta,
      },
    }));
  }

  handleSubmit = async e => {
    e.preventDefault();
    let isValid = true;
    const fields = {};
    const newState = {};
    for (const input of Object.values(this.state)) {
      const { name, type, value, checked, validate, meta, } = input;
      if (validate) {
        meta.error = validate(value);
      }
      meta.submitted = true;
      meta.valid = !meta.error;
      if (meta.valid) {
        fields[name] = type !== 'checkbox' ? value : checked;
      } else {
        isValid = false;
      }
      newState[name] = {
        ...input,
        meta,
      };
    }
    this.setState(newState);
    if (!isValid) {
      return;
    }
    const result = await this.props.onSubmit(fields);
    console.log('submitresult', result);
  }
  
  renderChildren = children => {
    return React.Children.map(children, child => {
      if (typeof child === 'string') return child;
      const { children, } = child.props;
      if (children) return React.cloneElement(child, { children: this.renderChildren(children), });
      const { name, } = child.props;
      return name && this.state[name]
        ? React.cloneElement(child, {
          ...this.state[name],
          onChange: this.handleChange,
        })
        : child;
    });
  }

  render () {
    const { children, } = this.props;
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        { this.renderChildren(children) }
      </StyledForm>
    );
  }

}


Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default Form;
