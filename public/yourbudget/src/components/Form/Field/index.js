import React from 'react';
import PropTypes from 'prop-types';

import { Textfield, Passwordfield, Numberfield } from './fieldTypes';



export default class Field extends React.Component {

  renderFieldBytype () {
    const { props, props: { type, }, } = this;
    switch (type) {
      case 'text': return <Textfield {...props} />;
      case 'password': return <Passwordfield {...props} />;
      case 'number': return <Numberfield {...props} />;
      default: return <div>{`Invalid field type ${type}`}</div>;
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.renderFieldBytype()}
      </React.Fragment>
    );
  }

}


Field.propTypes = {
  type: PropTypes.string.isRequired,
};
