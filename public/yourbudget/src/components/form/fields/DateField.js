import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import './common.css';
import './DateField.css';


class DateField extends Component {

  onChange = e => {
    this.props.onChange(this.props.name, e.target.value);
  }

  render () {
    const { props: { value, }, onChange, } = this;
    return (
      <input type='date' value={value} onChange={onChange} />
    );
  }

}


DateField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};


export default DateField;
