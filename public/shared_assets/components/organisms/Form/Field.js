import React from 'react';
import PropTypes from 'prop-types';

import { TextField, } from '../../molecules';


export default class Field extends React.Component {
  
  static propTypes = {
    type: PropTypes.string.isRequired,
  }

  state = {
    error: undefined,
    valid: false,
    pristine: true,
    touched: false,
    changed: false,
  }

  onFocus = () => this.setState(prevState => ({
    ...prevState,
    touched: true,
  }));

  onChange = ({ target: { value, }, }) => {
    const { name, validate, onChange, } = this.props;
    this.setState(prevState => {
      const error = (validate && validate(value)) || undefined;
      return {
        ...prevState,
        error,
        valid: !error,
        pristine: false,
        changed: true,
      };
    }, () => onChange({ name, value, valid: this.state.valid, }));
  }

  render () {
    const { onChange, onFocus, } = this;
    const { type, ...props } = this.props;
    return (
      <React.Fragment>
        {
          (type === 'text' && (
            <TextField
              {...props}
              meta={this.state}
              onFocus={onFocus}
              onChange={onChange}
            />
          ))
        }
      </React.Fragment>
    );
  }

}
