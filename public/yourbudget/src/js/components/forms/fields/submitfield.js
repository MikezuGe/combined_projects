import React, { Component, } from 'react';
import PropTypes from 'prop-types';


class SubmitField extends Component {

  render () {
    const { value, onSubmit, } = this.props;
    return (
      <input type='submit' value={value} onClick={onSubmit} />
    );
  }

}


SubmitField.propTypes = {
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


export default SubmitField;
