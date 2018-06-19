import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { firstLetterToUppercase, } from 'js/utility';
import * as fieldTypes from './fields';


class Field extends Component {

  render() {
    const Element = fieldTypes[firstLetterToUppercase(this.props.type) + 'Field'];
    return <Element {...this.props} />
  }

}


Field.propTypes = {
  type: PropTypes.string.isRequired,
}


export default Field;