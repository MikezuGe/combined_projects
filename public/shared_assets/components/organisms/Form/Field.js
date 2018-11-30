import React from 'react';
import PropTypes from 'prop-types';

import { parseDate, } from '../../utility';
import {
  TextField,
  NumberField,
  DateField,
  ToggleField,
  SubmitField,
} from '../../molecules';


const resetField = ({ type, initialValue, validate, }) => ({
  meta: {
    pristine: true,
    showError: false,
    error: validate
      ? validate(initialValue)
      : undefined,
  },
  value: initialValue
    ? (
      type === 'toggle' || type === 'checkbox'
        ? !!initialValue
        : type === 'date'
          ? parseDate(initialValue, 'YYYY-MM-DD')
          : initialValue
    )
    : type === 'toggle' || type === 'checkbox'
      ? false
      : '',
});


export default class Field extends React.Component {
  
  static propTypes = {
    type: PropTypes.string.isRequired,
  }

  state = resetField(this.props)

  reset = () => this.setState(resetField(this.props))

  onBlur = ({ target: { value, }, }) => {
    const { validate, } = this.props;
    const error = (validate && validate(value)) || undefined;
    this.setState(({ meta, }) => ({
      meta: {
        ...meta,
        showError: !!meta.error,
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
        pristine: false,
        showError: !!error,
        error,
      },
      value: type === 'toggle' || type === 'checkbox' ? checked : value,
    }));
  }

  render () {
    const { onChange, onBlur, } = this;
    const { type, ...props } = this.props;
    const { value, meta, } = this.state;
    const fieldProps = {
      ...props,
      value,
      meta,
      onChange,
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
