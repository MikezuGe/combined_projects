import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import 'css/thumbnails.css';


const imageElements = ({ openImage, thumbnailUrls, bigImageUrls, }) => {
  const imageElements = [];
  const length = thumbnailUrls.length;
  for (let i = 0; i < length; i += 1) {
    imageElements.push(<img key={thumbnailUrls[i]} src={thumbnailUrls[i]} onClick={() => openImage(bigImageUrls[i])} />);
  }
  return imageElements;
}


class Thumbnails extends Component {

  render ()  {
    return (
      <div>
        { imageElements(this.props) }
      </div>);
  }

}


Thumbnails.propTypes = {
  openImage: PropTypes.func.isRequired,
  thumbnailUrls: PropTypes.array.isRequired,
  bigImageUrls: PropTypes.array.isRequired,
};


export default Thumbnails;