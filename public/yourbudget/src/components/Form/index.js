import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export { default as Field, } from './Field';


const meta = {
  error: '',
  pristine: true,
  touched: false,
  valid: false,
  submitted: false,
};


const Wrapper = styled.form`
display: flex;
flex-direction: column;`;


export default class Form extends React.Component {

  inputFieldsToState = (children = this.props.children, state = {}) => {
    if (!children || typeof children === 'string') {
      return children;
    }
    if (!Array.isArray(children)) {
      children = [ children, ];
    }
  
    for (const { type, props, } of children) {
      if (typeof type === 'function' && (type.name === 'Field' || type.target.name === 'Field')) {
        if (props.type !== 'submit') {
          state[props.name] = {
            ...props,
            value: '',
            meta: { ...meta, },
          }
        }
      } else {
        this.inputFieldsToState(props.children, state);
      }
    }
    return state;
  };

  form = null
  submit = null
  close = null

  state = { ...this.inputFieldsToState(), }

  isValid = () => {
    let valid = true;
    const state = Object.entries(this.state).reduce((total, [ key, value, ]) => {
      const { meta, } = value;
      meta.error = value.validate(value.value);
      meta.valid = !meta.error;
      if (!meta.valid) {
        valid = false;
      }
      meta.submitted = true;
      total[key] = value;
      return total;
    }, {});
    this.setState(state);
    return valid;
  }

  handleChange = (name, value, meta) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
        meta,
      }
    }));
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.submit) {
      if (this.isValid()) {
        const result = await this.props.onSubmit(Object.values(this.state).reduce((total, { name, value, }) => {
          total[name] = value;
          return total;
        }, {}));
        console.log(result);
        if (result && this.close) {
          this.handleClose();
        }
      }
    } else if (this.close) {
      this.handleClose();
    }
  }

  handleButton = e => {
    const button = e.target;
    this.submit = button.getAttribute('submit') === 'true';
    this.close = button.getAttribute('close') === 'true';
  }

  handleClose = () => {
    this.props.onClose();
  }
  
  renderWithProps = children => {
    if (!children || typeof children === 'string') {
      return children;
    }
    if (!Array.isArray(children)) {
      children = [ children, ];
    }
    return children.map(({ type: Type, props, }, i) => {
      if (typeof Type === 'function' && (Type.name === 'Field' || Type.target.name === 'Field')) {
        if (props.type !== 'submit') {
          return <Type
            key={i}
            {...this.state[props.name]}
            onChange={this.handleChange}
          />
        } else {
          return <Type
            key={i}
            {...props}
            submit={(!!props.submit).toString()}
            close={(!!props.close).toString()}
            onClick={this.handleButton}
          />
        }
      } else {
        return (
          <Type key={i} {...props}>
            { this.renderWithProps(props.children) }
          </Type>
        );
      }
    });
  }

  render () {
    return (
      <Wrapper innerRef={form => this.form = form} onSubmit={this.handleSubmit}>
        { this.renderWithProps(this.props.children) }
      </Wrapper>
    );
  }

}


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};
