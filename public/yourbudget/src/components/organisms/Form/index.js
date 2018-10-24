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

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]).isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  
  state = {
    ...this.props.children.reduce(fieldsToState, {}),
  }

  resetFields () {
    this.setState(prevState => {
      const fields = Object.entries(prevState).reduce((total, [ key, value, ]) => {
        total[key] = {
          ...value,
          value: '',
          checked: true,
          meta: {
            ...meta,
          },
        };
        return total;
      }, {});
      return fields;
    });
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
    const { target, } = e;
    const submit = target.getAttribute('submit');
    const reset = target.getAttribute('reset');
    const close = target.getAttribute('close');
    if (!submit && close) {
      return this.props.onClose();
    }
    let isValid = true;
    const inputs = {};
    this.setState(Object.values(this.state).reduce((total, input) => {
      const { name, type, value, checked, validate, meta, } = input;
      if (validate) {
        meta.error = validate(value);
      }
      meta.submitted = true;
      meta.valid = !meta.error;
      if (meta.valid) {
        inputs[name] = type !== 'checkbox' ? value : checked;
      } else {
        isValid = false;
      }
      total[name] = {
        ...input,
        meta,
      }
      return total;
    }, {}));
    if (!isValid) {
      return;
    }
    const success = await this.props.onSubmit(inputs);
    if (success) {
      if (reset) {
        this.resetFields();
      } else if (close) {
        this.props.onClose();
      }
    }
  }
  
  renderChildren = children => React.Children.map(children, child => {
    if (typeof child === 'string') return child;
    const { children, } = child.props;
    if (children) return React.cloneElement(child, { children: this.renderChildren(children), });
    const { name, type, } = child.props;
    return name && this.state[name]
      ? React.cloneElement(child, {
        ...this.state[name],
        onChange: this.handleChange,
      })
      : type === 'submit'
        ? React.cloneElement(child, {
          onClick: this.handleSubmit,
        })
        : child;
  });

  render () {
    return (
      <StyledForm>
        { this.renderChildren(this.props.children) }
      </StyledForm>
    );
  }

}


export default Form;
