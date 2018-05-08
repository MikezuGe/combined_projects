import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import './css/style.css';

import Thumbnails from './js/thumbnails';
import BigImage from './js/bigimage';


axios.defaults.baseURL = `${window.location.origin}/api/images`;


class App extends Component {

  state = {
    thumbnailUrls: [],
    imageUrls: [],
    bigImageUrl: '',
  }

  componentDidMount() {
    axios.get('/')
      .then(result => {
        const { location, } = window;
        const { thumbnailUrls, bigImageUrls, } = result.data;
        this.setState({
          bigImageUrls: bigImageUrls.map(url => `${location}${url}`),
          thumbnailUrls: thumbnailUrls.map(url => `${location}${url}`),
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  openImage = bigImageUrl => {
    this.setState({ bigImageUrl, });
  }

  closeImage = () => {
    this.setState({ bigImageUrl: '', })
  }

  render = () => {
    const { thumbnailUrls, bigImageUrls, bigImageUrl, } = this.state;
    const { openImage, closeImage, } = this;
    return <div className={'container'}>
      { thumbnailUrls.length > 0 && bigImageUrls.length > 0 &&
        <Thumbnails openImage={openImage} thumbnailUrls={thumbnailUrls} bigImageUrls={bigImageUrls} /> }
      { bigImageUrl.length > 0 &&
        <BigImage closeImage={closeImage} bigImageUrl={bigImageUrl} /> }
    </div>
  }

}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
