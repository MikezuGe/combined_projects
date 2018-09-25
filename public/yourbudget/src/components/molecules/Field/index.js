import React from 'react';
import PropTypes from 'prop-types';

import Textfield from './Textfield';
import Passwordfield from './Passwordfield';
import Numberfield from './Numberfield';


export default class Field extends React.Component {

  onChange = ({ target: { name, value, }, }) => {
    const { meta, } = this.props;
    meta.submitted = false;
    meta.pristine = false;
    meta.touched = true;
    meta.error = this.props.validate(value);
    meta.valid = !meta.error;
    this.props.onChange(name, value, meta);
  }

  renderFieldBytype () {
    const { props, props: { type, }, } = this;
    switch (type) {
      case 'text': return <Textfield {...props} onChange={this.onChange} />;
      case 'password': return <Passwordfield {...props} onChange={this.onChange} />;
      case 'number': return <Numberfield {...props} onChange={this.onChange} />;
      case 'submit': return <input {...props} />;
      default: return <div>{`Invalid field type ${type}`}</div>;
    }
  }

  render () {
    return (
      <React.Fragment>
        { this.renderFieldBytype() }
      </React.Fragment>
    );
  }

}


Field.propTypes = {
  type: PropTypes.string.isRequired,
};