import React, { Component, } from 'react';
import PropTypes from 'prop-types';


class TextField extends Component {

  onChange = e => {
    const value = e.target.value;
    const { name, meta, } = this.props;
    meta.error = this.props.validate(value);
    meta.valid = meta.error === undefined;
    meta.changed = true;
    meta.pristine = false;
    this.props.onChange(name, value, meta);
  }

  render () {
    const { props: { name, value, meta, }, onChange, } = this;
    return (
      <div>
        <label htmlFor={name}>{name}</label>
        <input id={name} type='text' value={value} onChange={onChange} />
        { meta.submitted && !meta.changed && meta.error &&
          <label htmlFor={name}>{meta.error}</label> }
      </div>
    );
  }

}


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};


export default TextField;
