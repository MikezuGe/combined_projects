import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  NumberField,
  DateField,
  ToggleField,
  SubmitField,
} from '../../molecules';


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
    focused: false,
  }

  onFocus = () => this.setState({
    focused: true,
    touched: true,
  });

  onBlur = ({ target: { value, }, }) => {
    const { validate, } = this.props;
    const error = (validate && validate(value)) || undefined;
    this.setState({
      error,
      valid: !error,
      focused: false,
    });
  }

  onChange = ({ target: { value, checked, }, }) => {
    const { name, type, validate, onChange, } = this.props;
    const error = (validate && validate(value)) || undefined;
    this.setState({
      error,
      valid: !error,
      pristine: false,
      changed: true,
    }, () => onChange({
      name,
      value: type === 'toggle' || type === 'checkbox' ? checked : value,
      valid: this.state.valid,
    }));
  }

  render () {
    const { onChange, onFocus, onBlur, } = this;
    const { type, ...props } = this.props;
    const meta = this.state;
    const fieldProps = {
      ...props,
      meta,
      onChange,
      onFocus,
      onBlur,
    };
    return (
      <React.Fragment>
        {
          (type === 'text' && <TextField {...fieldProps} />)
          || (type === 'number' && <NumberField {...fieldProps} />)
          || (type === 'date' && <DateField {...fieldProps} />)
          || (type === 'toggle' && <ToggleField {...fieldProps} value={!!props.value} />)
          || (type === 'submit' && <SubmitField {...props} />)
          || (<div>{`No field of type ${type} exists`}</div>)
        }
      </React.Fragment>
    );
  }

}
