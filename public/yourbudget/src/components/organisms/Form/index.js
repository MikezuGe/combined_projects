import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledForm = styled.form`

`;


const fieldsToState = (total, current) => {
  if (!React.isValidElement(current)) return total;
  const { children, } = current.props;
  children && Array.isArray(children)
    ? children.reduce(fieldsToState, total)
    : fieldsToState(total, children);
  console.log(current);
  if (current.type === 'input') {
    total[current.props.name] = {
      ...current.props,
      value: '',
    };
  }
  return total;
};


class Form extends React.Component {
  
  state = {
    ...this.props.children.reduce(fieldsToState, {}),
  }

  handleChange = ({ name, value, meta, }) => {
    this.setState(prevState => ({ [name]: {
      ...prevState[name],
      value,
      meta: {
        ...prevState.meta,
        ...meta,
      },
    }}))
  }
  
  renderChildren = children => {
    if (Array.isArray(children)) return children.map(this.renderChildren);
    return children.type === 'input'
      ? <children.type {...this.state[children.props.name]} onChange={this.handleChange} />
      : children;
  }

  render () {
    const { children, } = this.props;
    console.log(this.state);
    return (
      <StyledForm>
        { Array.isArray(children)
          ? children.map(this.renderChildren)
          : this.renderChildren(children) }
      </StyledForm>
    );
  }

}


Form.propTypes = {

};


export default Form;
