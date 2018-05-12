import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import '../css/bigimage.css';


class BigImage extends Component {

  render () {
    const { bigImageUrl, closeImage, } = this.props;
    return <img src={bigImageUrl} onClick={closeImage} />;
  }

}


BigImage.propTypes = {
  bigImageUrl: PropTypes.string.isRequired,
  closeImage: PropTypes.func.isRequired,
};


export default BigImage;