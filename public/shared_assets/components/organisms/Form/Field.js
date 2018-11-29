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

  state = (() => {
    const { type, initialValue, validate, } = this.props;
    return {
      meta: {
        pristine: true,
        focused: false,
        touched: false,
        error: validate
          ? validate(initialValue)
          : undefined,
      },
      value: initialValue
        ? (
          type === 'toggle' || type === 'checkbox'
            ? !!initialValue
            : initialValue
          )
        : type === 'toggle' || type === 'checkbox'
          ? false
          : '',
    }
  })()

  onFocus = () => this.setState(({ meta, }) => ({
    meta: {
      ...meta,
      focused: true,
    },
  }));

  onBlur = ({ target: { value, }, }) => {
    const { validate, } = this.props;
    const error = (validate && validate(value)) || undefined;
    this.setState(({ meta, }) => ({
      meta: {
        ...meta,
        focused: false,
        touched: true,
        error,
      },
    }));
  }

  onChange = ({ target: { value, checked, }, }) => {
    const { type, validate, } = this.props;
    const error = (validate && validate(value)) || undefined;
    this.setState(({ meta, }) => ({
      meta: {
        ...meta,
        error,
        pristine: false,
        touched: true,
      },
      value: type === 'toggle' || type === 'checkbox' ? checked : value,
    }));
  }

  render () {
    const { onChange, onFocus, onBlur, } = this;
    const { type, formIsValid, ...props } = this.props;
    const { value, meta, } = this.state;
    const fieldProps = {
      ...props,
      value,
      meta: {
        ...meta

      },
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
          || (type === 'toggle' && <ToggleField {...fieldProps} />)
          || (type === 'submit' && <SubmitField {...props} />)
          || (<div>{`No field of type ${type} exists`}</div>)
        }
      </React.Fragment>
    );
  }

}
