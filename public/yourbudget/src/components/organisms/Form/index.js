import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledForm = styled.form`
background: red;
padding: 1em;
`;


const meta = {
  error: '',
  pristine: true,
  touched: false,
  changed: false,
  submitted: false,
};


const fieldsToState = (total, current) => {
  if (!React.isValidElement(current)) return total;
  const { children, } = current.props;
  children && React.Children.map(children, child => fieldsToState(total, child));
  const { name, } = current.props;
  if (name) {
    total[name] = {
      ...current.props,
      value: '',
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

  handleChange = ({ name, value, }) => {
    this.setState(prevState => {
      const field = prevState[name];
      return {
        [name]: {
          ...field,
          value,
          meta: {
            ...field.meta,
            pristine: false,
            changed: true,
          },
        },
      };
    });
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
      <StyledForm>
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
};


export default Form;
